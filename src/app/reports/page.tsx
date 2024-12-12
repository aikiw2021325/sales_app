import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Eye, Edit } from "lucide-react";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";


type BadgeVariant = "default" | "secondary" | "destructive" | "outline";
type StatusType = "承認済み" | "下書き" | "承認待ち";
type Report = {
  id: number;
  title: string;
  type: string;
  date: string;
  author: string;
  status: StatusType;
};

const ReportsPage = () => {
  const reports : Report[]= [
    {
      id: 1,
      title: "A社商談報告",
      type: "商談報告",
      date: "2024-12-12",
      author: "山田太郎",
      status: "承認済み"
    },
    {
      id: 2,
      title: "B社提案書",
      type: "提案書",
      date: "2024-12-11",
      author: "鈴木一郎",
      status: "下書き"
    },
    {
      id: 3,
      title: "C社契約報告",
      type: "契約報告",
      date: "2024-12-10",
      author: "佐藤花子",
      status: "承認待ち"
    },
  ];

  const getStatusBadge = (status: StatusType) => {
    const variants : Record<StatusType, BadgeVariant>= {
      "承認済み": "default",
      "下書き": "secondary",
      "承認待ち": "destructive"
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6" />
              営業日報
            </CardTitle>
            <Button>
              新規作成
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* ヘッダー */}
          <div className="grid grid-cols-6 gap-4 py-3 px-4 font-medium text-sm text-muted-foreground bg-muted/50">
            <div>タイトル</div>
            <div>種類</div>
            <div>作成日</div>
            <div>作成者</div>
            <div>ステータス</div>
            <div className="text-right">操作</div>
          </div>

          {/* レポートリスト */}
          <div className="divide-y">
            {reports.map((report) => (
              <div
                key={report.id}
                className="grid grid-cols-6 gap-4 py-4 px-4 items-center hover:bg-muted/50 transition-colors"
              >
                <div className="font-medium">{report.title}</div>
                <div>{report.type}</div>
                <div>{report.date}</div>
                <div>{report.author}</div>
                <div>{getStatusBadge(report.status)}</div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* レポートが0件の場合 */}
          {reports.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              レポートがありません
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;