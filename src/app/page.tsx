import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  FileText,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Activity
} from 'lucide-react';

const DashboardPage = () => {
  // サンプルデータ
  const monthlyStats = {
    currentSales: 4231000,
    previousSales: 3521000,
    meetings: 42,
    previousMeetings: 30,
    proposals: 15,
    previousProposals: 12,
    deals: 8,
    previousDeals: 5,
    targetProgress: 78
  };

  const recentActivities = [
    {
      id: 1,
      type: '商談',
      title: '株式会社A社 製品デモ',
      client: 'A社',
      date: '2024-12-12 14:00',
      status: '完了'
    },
    {
      id: 2,
      type: '提案',
      title: 'B社向けソリューション提案',
      client: 'B社',
      date: '2024-12-11 11:00',
      status: '進行中'
    },
    {
      id: 3,
      type: '契約',
      title: 'C社 契約書締結',
      client: 'C社',
      date: '2024-12-10 16:00',
      status: '完了'
    },
    {
      id: 4,
      type: 'フォロー',
      title: 'D社 メンテナンス状況確認',
      client: 'D社',
      date: '2024-12-09 13:00',
      status: '予定'
    },
  ];

  const topClients = [
    { name: 'A社', sales: 1200000, progress: 80 },
    { name: 'B社', sales: 980000, progress: 65 },
    { name: 'C社', sales: 850000, progress: 55 },
    { name: 'D社', sales: 720000, progress: 48 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 主要指標 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今月の売上</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ¥{monthlyStats.currentSales.toLocaleString()}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500">
                +{(((monthlyStats.currentSales - monthlyStats.previousSales) / monthlyStats.previousSales) * 100).toFixed(1)}%
              </span>
              <span>vs last month</span>
            </div>
            <Progress 
              value={monthlyStats.targetProgress} 
              className="mt-3"
            />
            <p className="text-xs text-muted-foreground mt-1">
              目標達成率 {monthlyStats.targetProgress}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">商談件数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.meetings}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500">
                +{(((monthlyStats.meetings - monthlyStats.previousMeetings) / monthlyStats.previousMeetings) * 100).toFixed(1)}%
              </span>
              <span>vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">提案件数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.proposals}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500">
                +{(((monthlyStats.proposals - monthlyStats.previousProposals) / monthlyStats.previousProposals) * 100).toFixed(1)}%
              </span>
              <span>vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">成約件数</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyStats.deals}</div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500">
                +{(((monthlyStats.deals - monthlyStats.previousDeals) / monthlyStats.previousDeals) * 100).toFixed(1)}%
              </span>
              <span>vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要取引先と活動履歴 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>主要取引先</CardTitle>
            <CardDescription>
              売上高トップ4の取引先
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topClients.map((client) => (
                <div key={client.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{client.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{client.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ¥{client.sales.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {client.progress}%
                    </p>
                  </div>
                  <Progress value={client.progress} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>最近の活動</CardTitle>
            <CardDescription>
              直近の商談や提案の状況
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4"
                  >
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.title}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span>{activity.type}</span>
                        <span className="mx-1">•</span>
                        <span>{activity.date}</span>
                      </div>
                    </div>
                    <Button
                      variant={activity.status === '完了' ? 'outline' : 'default'}
                      size="sm"
                    >
                      {activity.status}
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;