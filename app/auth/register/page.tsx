"use client";

import type React from "react";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";

function RegisterContent() {
  const router = useRouter();

  // Farmer registration state
  const [farmerStep, setFarmerStep] = useState(1);
  const [farmerData, setFarmerData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    farmName: "",
    farmAddress: "",
    farmSize: "",
    description: "",
  });

  const handleFarmerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (farmerStep < 3) {
      setFarmerStep(farmerStep + 1);
    } else {
      router.push("/farmer/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agro-cream via-white to-agro-green/5 flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-agro-green hover:text-agro-green-dark mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Về trang chủ
        </Link>

        <Card className="border-agro-green/20 shadow-xl">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-agro-green">
                <svg
                  className="h-10 w-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L4 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-8-5zm0 15.5l-5-3v-6l5-3 5 3v6l-5 3z" />
                </svg>
              </div>
            </div>
            <CardTitle className="text-2xl text-agro-green">
              Đăng ký AgroTemp
            </CardTitle>
            <CardDescription>Đăng ký dành cho Nông dân</CardDescription>
          </CardHeader>

          <CardContent>
            <div>
                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-6">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          farmerStep >= step
                            ? "bg-agro-green text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {farmerStep > step ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          step
                        )}
                      </div>
                      {step < 3 && (
                        <div
                          className={`w-16 h-1 mx-2 ${
                            farmerStep > step ? "bg-agro-green" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleFarmerSubmit} className="space-y-4">
                  {farmerStep === 1 && (
                    <>
                      <h3 className="font-semibold text-lg mb-4">
                        Thông tin tài khoản
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="farmer-name">Họ và tên</Label>
                        <Input
                          id="farmer-name"
                          placeholder="Nguyễn Văn A"
                          value={farmerData.name}
                          onChange={(e) =>
                            setFarmerData({
                              ...farmerData,
                              name: e.target.value,
                            })
                          }
                          className="border-agro-green/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmer-email">Email</Label>
                        <Input
                          id="farmer-email"
                          type="email"
                          placeholder="email@example.com"
                          value={farmerData.email}
                          onChange={(e) =>
                            setFarmerData({
                              ...farmerData,
                              email: e.target.value,
                            })
                          }
                          className="border-agro-green/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farmer-phone">Số điện thoại</Label>
                        <Input
                          id="farmer-phone"
                          type="tel"
                          placeholder="0912 345 678"
                          value={farmerData.phone}
                          onChange={(e) =>
                            setFarmerData({
                              ...farmerData,
                              phone: e.target.value,
                            })
                          }
                          className="border-agro-green/30"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="farmer-password">Mật khẩu</Label>
                          <Input
                            id="farmer-password"
                            type="password"
                            placeholder="Tối thiểu 8 ký tự"
                            value={farmerData.password}
                            onChange={(e) =>
                              setFarmerData({
                                ...farmerData,
                                password: e.target.value,
                              })
                            }
                            className="border-agro-green/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="farmer-confirm">
                            Xác nhận mật khẩu
                          </Label>
                          <Input
                            id="farmer-confirm"
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            value={farmerData.confirmPassword}
                            onChange={(e) =>
                              setFarmerData({
                                ...farmerData,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="border-agro-green/30"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {farmerStep === 2 && (
                    <>
                      <h3 className="font-semibold text-lg mb-4">
                        Thông tin nông trại
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="farm-name">Tên nông trại</Label>
                        <Input
                          id="farm-name"
                          placeholder="Nông trại Hạnh Phúc"
                          value={farmerData.farmName}
                          onChange={(e) =>
                            setFarmerData({
                              ...farmerData,
                              farmName: e.target.value,
                            })
                          }
                          className="border-agro-green/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farm-address">Địa chỉ nông trại</Label>
                        <div className="relative">
                          <Input
                            id="farm-address"
                            placeholder="Số nhà, đường, xã/phường, huyện/quận, tỉnh"
                            value={farmerData.farmAddress}
                            onChange={(e) =>
                              setFarmerData({
                                ...farmerData,
                                farmAddress: e.target.value,
                              })
                            }
                            className="border-agro-green/30 pr-10"
                          />
                          <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farm-size">Diện tích (hecta)</Label>
                        <Input
                          id="farm-size"
                          type="number"
                          placeholder="5"
                          value={farmerData.farmSize}
                          onChange={(e) =>
                            setFarmerData({
                              ...farmerData,
                              farmSize: e.target.value,
                            })
                          }
                          className="border-agro-green/30"
                        />
                      </div>
                    </>
                  )}

                  {farmerStep === 3 && (
                    <>
                      <h3 className="font-semibold text-lg mb-4">Mô tả thêm</h3>
                      <div className="space-y-2">
                        <Label htmlFor="farm-description">
                          Giới thiệu về nông trại
                        </Label>
                        <Textarea
                          id="farm-description"
                          placeholder="Nông trại chuyên trồng lúa, hoa màu..."
                          value={farmerData.description}
                          onChange={(e) =>
                            setFarmerData({
                              ...farmerData,
                              description: e.target.value,
                            })
                          }
                          className="border-agro-green/30 min-h-24"
                        />
                      </div>
                      <div className="p-4 bg-agro-cream rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Bằng việc đăng ký, bạn đồng ý với{" "}
                          <Link
                            href="/terms"
                            className="text-agro-green hover:underline"
                          >
                            Điều khoản sử dụng
                          </Link>{" "}
                          và{" "}
                          <Link
                            href="/privacy"
                            className="text-agro-green hover:underline"
                          >
                            Chính sách bảo mật
                          </Link>{" "}
                          của AgroTemp.
                        </p>
                      </div>
                    </>
                  )}

                  <div className="flex gap-3 pt-2">
                    {farmerStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setFarmerStep(farmerStep - 1)}
                        className="flex-1"
                      >
                        Quay lại
                      </Button>
                    )}
                    <Button
                      type="submit"
                      className="flex-1 bg-agro-green hover:bg-agro-green-dark text-white gap-2"
                    >
                      {farmerStep < 3 ? (
                        <>
                          Tiếp tục
                          <ArrowRight className="h-4 w-4" />
                        </>
                      ) : (
                        "Hoàn tất đăng ký"
                      )}
                    </Button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    Đã có tài khoản?{" "}
                    <Link
                      href="/auth/login"
                      className="text-agro-green hover:underline font-medium"
                    >
                      Đăng nhập
                    </Link>
                  </p>
                </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <RegisterContent />
    </Suspense>
  );
}
