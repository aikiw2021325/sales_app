"use client";
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Send, Loader2, PieChart } from 'lucide-react';

const ReportChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'こんにちは！営業日報の作成をサポートします。まずは、今日の商談内容について教えてください。'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState({
    clientName: '',
    meetingDate: new Date().toISOString().split('T')[0],
    attendees: '',
    purpose: '',
    content: '',
    nextActions: '',
    progress: 0 // 報告書の完成度
  });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const newMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setLoading(true);

    // AIの応答をシミュレート
    setTimeout(() => {
      const aiResponse = { 
        role: 'assistant', 
        content: '承知しました。その内容を報告書に反映しましょう。他に補足する内容はありますか？',
        reportUpdate: {
          content: input,
          progress: Math.min(reportData.progress + 20, 100) // 進捗を更新
        }
      };
      setMessages(prev => [...prev, aiResponse]);
      setReportData(prev => ({
        ...prev,
        ...aiResponse.reportUpdate
      }));
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[800px]">
        {/* プレビューセクション */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <PieChart className="h-6 w-6" />
                  営業日報
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">取引先</p>
                    <p className="font-medium">{reportData.clientName || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">面談日時</p>
                    <p className="font-medium">{reportData.meetingDate || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">参加者</p>
                    <p className="font-medium">{reportData.attendees || '-'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">面談目的</p>
                    <p className="font-medium">{reportData.purpose || '-'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">面談内容</h3>
                  <Card className="p-4 bg-muted/50">
                    <p className="whitespace-pre-wrap">
                      {reportData.content || '未入力'}
                    </p>
                  </Card>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">次のアクション</h3>
                  <Card className="p-4 bg-muted/50">
                    <p className="whitespace-pre-wrap">
                      {reportData.nextActions || '未入力'}
                    </p>
                  </Card>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  下書き保存
                </Button>
                <Button>
                  提出
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
                {/* チャットセクション */}
                <Card className="flex flex-col">
          <CardContent className="p-4 flex-1">
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">AI アシスタント</h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex-1">
                    <Progress value={reportData.progress} className="h-2" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {reportData.progress}% 完了
                  </span>
                </div>
              </div>

              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`rounded-lg px-4 py-2 max-w-[80%] ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="rounded-lg px-4 py-2 bg-muted">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="メッセージを入力..."
                    className="min-h-[80px]"
                  />
                  <Button type="submit" size="icon" disabled={loading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportChatInterface;