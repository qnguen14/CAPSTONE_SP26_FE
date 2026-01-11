"use client"

import { useState } from "react"
import { Wallet, ArrowUpRight, ArrowDownLeft, Plus, CreditCard, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export function WorkerWalletScreen() {
  const [activeTab, setActiveTab] = useState("all")

  const balance = 2500000
  const pendingBalance = 850000

  const transactions = [
    {
      id: 1,
      type: "income",
      title: "Thu hoạch lúa",
      farmer: "Nguyễn Văn A",
      amount: 250000,
      date: "10/01/2026",
      status: "completed",
    },
    {
      id: 2,
      type: "income",
      title: "Chăm sóc vườn cam",
      farmer: "Trần Thị B",
      amount: 600000,
      date: "05/01/2026",
      status: "completed",
    },
    {
      id: 3,
      type: "withdrawal",
      title: "Rút tiền về VNPay",
      amount: 1000000,
      date: "03/01/2026",
      status: "completed",
    },
    {
      id: 4,
      type: "pending",
      title: "Phun thuốc trừ sâu",
      farmer: "Phạm Văn D",
      amount: 350000,
      date: "15/01/2026",
      status: "pending",
    },
    {
      id: 5,
      type: "pending",
      title: "Thu hoạch dưa hấu",
      farmer: "Trần Văn E",
      amount: 280000,
      date: "18/01/2026",
      status: "pending",
    },
  ]

  const filteredTransactions =
    activeTab === "all"
      ? transactions
      : activeTab === "income"
        ? transactions.filter((t) => t.type === "income")
        : activeTab === "withdrawal"
          ? transactions.filter((t) => t.type === "withdrawal")
          : transactions.filter((t) => t.type === "pending")

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Balance Card */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20">
              <Wallet className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-primary-foreground/80">Số dư khả dụng</p>
              <p className="text-3xl font-bold">{balance.toLocaleString()}đ</p>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-primary-foreground/10 p-3">
            <p className="text-sm text-primary-foreground/80">
              Đang chờ xử lý: <span className="font-semibold">{pendingBalance.toLocaleString()}đ</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
              <ArrowUpRight className="h-5 w-5 text-primary" />
              <span>Rút tiền</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rút tiền</DialogTitle>
              <DialogDescription>Rút tiền về tài khoản VNPay hoặc Momo của bạn</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              <div>
                <Label>Số tiền rút</Label>
                <Input type="number" placeholder="Nhập số tiền" className="mt-2" />
                <p className="mt-1 text-xs text-muted-foreground">Số dư khả dụng: {balance.toLocaleString()}đ</p>
              </div>
              <div>
                <Label>Phương thức thanh toán</Label>
                <div className="mt-2 flex flex-col gap-2">
                  <Button variant="outline" className="justify-start bg-transparent">
                    <CreditCard className="mr-2 h-4 w-4" />
                    VNPay - **** 1234
                  </Button>
                  <Button variant="outline" className="justify-start bg-transparent">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Momo - 0901***234
                  </Button>
                </div>
              </div>
              <Button className="mt-2">Xác nhận rút tiền</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4 bg-transparent">
              <Plus className="h-5 w-5 text-primary" />
              <span>Liên kết TK</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Liên kết tài khoản</DialogTitle>
              <DialogDescription>Thêm tài khoản thanh toán mới</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-3 py-4">
              <Button variant="outline" className="h-auto justify-start py-4 bg-transparent">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-primary-foreground">
                    VP
                  </div>
                  <div className="text-left">
                    <p className="font-medium">VNPay</p>
                    <p className="text-xs text-muted-foreground">Liên kết ví VNPay</p>
                  </div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto justify-start py-4 bg-transparent">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-500 text-primary-foreground">
                    M
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Momo</p>
                    <p className="text-xs text-muted-foreground">Liên kết ví Momo</p>
                  </div>
                </div>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Transaction History */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Lịch sử giao dịch</h3>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" className="text-xs">
              Tất cả
            </TabsTrigger>
            <TabsTrigger value="income" className="text-xs">
              Thu nhập
            </TabsTrigger>
            <TabsTrigger value="withdrawal" className="text-xs">
              Rút tiền
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-xs">
              Chờ xử lý
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="flex flex-col gap-3">
              {filteredTransactions.map((transaction) => (
                <Card key={transaction.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          transaction.type === "income"
                            ? "bg-primary/10"
                            : transaction.type === "withdrawal"
                              ? "bg-destructive/10"
                              : "bg-muted"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <ArrowDownLeft className="h-5 w-5 text-primary" />
                        ) : transaction.type === "withdrawal" ? (
                          <ArrowUpRight className="h-5 w-5 text-destructive" />
                        ) : (
                          <History className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{transaction.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.farmer ? transaction.farmer + " • " : ""}
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold ${
                          transaction.type === "income"
                            ? "text-primary"
                            : transaction.type === "withdrawal"
                              ? "text-destructive"
                              : "text-muted-foreground"
                        }`}
                      >
                        {transaction.type === "withdrawal" ? "-" : "+"}
                        {transaction.amount.toLocaleString()}đ
                      </p>
                      {transaction.status === "pending" && <p className="text-xs text-muted-foreground">Chờ xử lý</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
