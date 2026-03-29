"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Loader2, CalendarIcon } from "lucide-react";
import { handleApiError } from "@/lib/utils/error-handler";
import { UpdateFarmerRequest } from "@/libs/api/types";
import { farmerService } from "@/libs/api/services/farmer.service";
import { cloudinaryService } from "@/libs/api/services/cloudinary.service";
import { useToast } from "@/hooks/use-toast";

export default function SetupProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");
  const avatarInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<UpdateFarmerRequest>({
    contactName: "",
    address: "",
    dateOfBirth: "",
    avatarUrl: "",
  });

  const handleInputChange = (field: keyof UpdateFarmerRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);

      const uploadResponse = await cloudinaryService.uploadImage(file);
      const uploadedUrl = uploadResponse.data;

      if (!uploadedUrl) {
        throw new Error("Không nhận được URL ảnh từ server");
      }

      setAvatarPreview(uploadedUrl);
      setFormData((prev) => ({
        ...prev,
        avatarUrl: uploadedUrl,
      }));

      toast({
        title: "Thành công",
        description: "Tải ảnh lên thành công. Vui lòng hoàn tất biểu mẫu.",
      });
    } catch (error: any) {
      toast({
        title: "Lỗi",
        description: handleApiError(error, {
          defaultMessage: "Không thể tải ảnh đại diện lên",
        }),
        variant: "destructive",
      });
    } finally {
      setUploadingAvatar(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contactName || !formData.address) {
       toast({
         title: "Thiếu thông tin",
         description: "Vui lòng điền họ tên và địa chỉ.",
         variant: "destructive",
       });
       return;
    }

    try {
      setSaving(true);
      
      // format date if provided
      let finalData = { ...formData };
      if (finalData.dateOfBirth) {
         // Optionally format if needed for API compliance
         // Keep YYYY-MM-DD or whatever the input provides
      } else {
         delete finalData.dateOfBirth;
      }

      await farmerService.updateProfile(finalData);
      
      toast({
        title: "Thành công",
        description: "Hồ sơ của bạn đã được thiết lập.",
      });
      
      router.push("/farmer/dashboard");
    } catch (error: any) {
      console.error("Setup profile error:", error);
      toast({
        title: "Lỗi",
        description: handleApiError(error, {
          defaultMessage: "Không thể thiết lập cấu hình. Vui lòng thử lại sau.",
        }),
        variant: "destructive",
      });
    } finally {
      setSaving(true); // intentional keep loading to prevent resubmission before redirect
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-agro-cream via-white to-agro-green/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="border-agro-green/20 shadow-xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl text-agro-green">
              Thiết lập hồ sơ cá nhân
            </CardTitle>
            <CardDescription>
              Vui lòng cập nhật thông tin cá nhân của bạn để tiếp tục
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center justify-center gap-4 py-4 mb-2">
                <Avatar className="h-28 w-28 md:h-32 md:w-32 shadow-sm border border-muted/50">
                  <AvatarImage className="object-cover" src={avatarPreview || "/placeholder.svg"} />
                  <AvatarFallback className="bg-agro-green text-white text-4xl">
                    {formData.contactName ? formData.contactName.charAt(0).toUpperCase() : "NA"}
                  </AvatarFallback>
                </Avatar>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="gap-2 bg-transparent text-sm"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={uploadingAvatar}
                >
                  {uploadingAvatar ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  {uploadingAvatar ? "Đang tải lên..." : "Tải ảnh đại diện"}
                </Button>
              </div>

              {/* Form fields */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Họ và Tên <span className="text-red-500">*</span></Label>
                  <Input
                    id="contactName"
                    placeholder="VD: Nguyễn Văn A"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    className="border-agro-green/30 focus:border-agro-green"
                    autoFocus
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ <span className="text-red-500">*</span></Label>
                  <Input
                    id="address"
                    placeholder="VD: Xã Y, Huyện X, Tỉnh Z"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="border-agro-green/30 focus:border-agro-green"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                  <div className="relative">
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      className="border-agro-green/30 focus:border-agro-green"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-agro-green hover:bg-agro-green-dark text-white"
                disabled={saving || uploadingAvatar}
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  "Hoàn tất"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
