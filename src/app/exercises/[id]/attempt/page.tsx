'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Clock, FileText, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  id: number;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | 'essay';
  options?: string[];
  correct_answer: string;
  points: number;
}

export default function AttemptExercisePage() {
  const params = useParams();
  const exerciseId = useMemo(() => Number(params?.id), [params]);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      try {
        const qs = await fetch(`http://127.0.0.1:8000/api/v1/exercises/${exerciseId}/questions`).then(r => r.json());
        if (cancelled) return;
        setQuestions(qs);
        const st = await fetch(`http://127.0.0.1:8000/api/v1/exercises/${exerciseId}/attempts/start`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: user?.id })
        }).then(r => r.json());
        if (cancelled) return;
        setAttemptId(st.id);
      } catch {}
      finally { if (!cancelled) setLoading(false); }
    };
    if (exerciseId && user?.id) init();
    return () => { cancelled = true; };
  }, [exerciseId, user?.id]);

  const onChange = (qid: number, value: string) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
  };

  const onSubmit = async () => {
    if (!attemptId || !user) return;
    const payload = {
      user_id: user.id,
      answers: Object.entries(answers).map(([qid, ans]) => ({ question_id: Number(qid), answer: ans }))
    };
    const res = await fetch(`http://127.0.0.1:8000/api/v1/exercises/${exerciseId}/attempts/${attemptId}/submit`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    }).then(r => r.json());
    setSubmitted(true);
    setScore(res.score ?? 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Làm bài kiểm tra</h1>
            </div>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Clock className="h-4 w-4 mr-1" /> Thời gian linh hoạt
            </div>
          </div>

          {!submitted ? (
            <>
              <div className="space-y-6">
                {questions.map((q, idx) => (
                  <div key={q.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Câu {idx + 1} ({q.points}đ)</div>
                    <div className="font-medium text-gray-900 dark:text-white mb-3">{q.question_text}</div>
                    {q.question_type === 'multiple_choice' && (
                      <div className="space-y-2">
                        {q.options?.map((opt, i) => (
                          <label key={i} className="flex items-center space-x-2">
                            <input type="radio" name={`q_${q.id}`} value={opt} onChange={(e) => onChange(q.id, e.target.value)} className="text-blue-600" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {q.question_type === 'true_false' && (
                      <div className="flex space-x-6">
                        <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"><input type="radio" name={`q_${q.id}`} value="true" onChange={(e) => onChange(q.id, e.target.value)} /> <span>Đúng</span></label>
                        <label className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"><input type="radio" name={`q_${q.id}`} value="false" onChange={(e) => onChange(q.id, e.target.value)} /> <span>Sai</span></label>
                      </div>
                    )}
                    {q.question_type === 'essay' && (
                      <textarea className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={4} onChange={(e) => onChange(q.id, e.target.value)} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <button onClick={onSubmit} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">Nộp bài</button>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Đã nộp bài</div>
              <div className="text-gray-700 dark:text-gray-300">Điểm của bạn: <span className="font-semibold">{score}</span></div>
              <button onClick={() => router.push('/exercises')} className="mt-6 bg-gray-800 dark:bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600">Quay lại danh sách</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


