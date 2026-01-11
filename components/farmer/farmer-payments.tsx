"use client"

import { useState } from "react"
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, CreditCard, TrendingUp, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function FarmerPayments() {
  const [activeTab, setActiveTab] = useState("all")

  const balance = 5500000
  const escrowBalance = 2100000
  const totalSpent = 15500000

  const transactions = [
    {
      id: 1,
      type: "payment",
      title: "Thanh toán cho Trần Minh Đức",
      job: "Thu hoạch lúa",
      amount: 250000,
      date: "10/01/2026",
      status: "completed",
    },
    {
      id: 2,
      type: "deposit",
      title: "Nạp tiền từ VNPay",
      amount: 5000000,
      date: "08/01/2026",
      status: "completed",
    },
    {
      id: 3,
      type: "escrow",
      title: "Tạm giữ - Phun thuốc trừ sâu",
      job: "Phun thuốc trừ sâu",
      amount: 1400000,
      date: "07/01/2026",
      status: "holding",
      workers: 4,
    },
    {
      id: 4,
      type: "payment",
      title: "Thanh toán cho Lê Thị Hoa",
      job: "Chăm sóc vườn cam",
      amount: 600000,
      date: "05/01/2026",
      status: "completed",
    },
    {
      id: 5,
      type: "fee",
      title: "Phí dịch vụ - Tháng 1/2026",
      amount: 75000,
      date: "01/01/2026",
      status: "completed",
    },
  ]

  const filteredTransactions =
    activeTab === "all"
      ? transactions
      : activeTab === "payment"
        ? transactions.filter((t) => t.type === "payment")
        : activeTab === "deposit"
          ? transactions.filter((t) => t.type === "deposit")
          : transactions.filter((t) => t.type === "escrow")

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quản lý thanh toán</h1>
          <p className="text-muted-foreground">Theo dõi chi phí và giao dịch</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Xuất báo cáo
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nạp tiền
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nạp tiền vào ví</DialogTitle>
                <DialogDescription>Chọn phương thức và số tiền cần nạp</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <div>
                  <Label>Số tiền nạp</Label>
                  <Input type="number" placeholder="Nhập số tiền" className="mt-2" />
                </div>
                <div>
                  <Label>Phương thức thanh toán</Label>
                  <div className="mt-2 flex flex-col gap-2">
                    <Button variant="outline" className="justify-start bg-transparent">
                      <CreditCard className="mr-2 h-4 w-4" />
                      VNPay
                    </Button>
                    <Button variant="outline" className="justify-start bg-transparent">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Momo
                    </Button>
                    <Button variant="outline" className="justify-start bg-transparent">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Chuyển khoản ngân hàng
                    </Button>
                  </div>
                </div>
                <Button className="mt-2">Xác nhận nạp tiền</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-primary-foreground/80">Số dư ví</p>
                <p className="text-2xl font-bold">{balance.toLocaleString()}đ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
                <FileText className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Đang tạm giữ</p>
                <p className="text-2xl font-bold text-card-foreground">{escrowBalance.toLocaleString()}đ</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-3/10">
                <TrendingUp className="h-6 w-6 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tổng chi tháng này</p>
                <p className="text-2xl font-bold text-card-foreground">{totalSpent.toLocaleString()}đ</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Lịch sử giao dịch</CardTitle>
              <CardDescription>Tất cả giao dịch của bạn</CardDescription>
            </div>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="payment">Thanh toán</TabsTrigger>
                <TabsTrigger value="deposit">Nạp tiền</TabsTrigger>
                <TabsTrigger value="escrow">Tạm giữ</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Giao dịch</TableHead>
                <TableHead>Ngày</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Số tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          transaction.type === "deposit"
                            ? "bg-primary/10"
                            : transaction.type === "payment"
                              ? "bg-destructive/10"
                              : transaction.type === "escrow"
                                ? "bg-accent/20"
                                : "bg-muted"
                        }`}
                      >
                        {transaction.type === "deposit" ? (
                          <ArrowDownLeft className="h-5 w-5 text-primary" />
                        ) : transaction.type === "payment" ? (
                          <ArrowUpRight className="h-5 w-5 text-destructive" />
                        ) : (
                          <FileText className="h-5 w-5 text-accent-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.title}</p>
                        {transaction.job && <p className="text-sm text-muted-foreground">{transaction.job}</p>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    {transaction.status === "completed" ? (
                      <Badge className="bg-primary/10 text-primary">Hoàn thành</Badge>
                    ) : (
                      <Badge variant="secondary">Đang giữ</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-semibold ${
                        transaction.type === "deposit"
                          ? "text-primary"
                          : transaction.type === "escrow"
                            ? "text-accent-foreground"
                            : "text-destructive"
                      }`}
                    >
                      {transaction.type === "deposit" ? "+" : "-"}
                      {transaction.amount.toLocaleString()}đ
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
