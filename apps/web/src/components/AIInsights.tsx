"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Loader2, ArrowRight, RefreshCcw } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { getStoredToken } from "@/lib/auth-storage";

type AIInsightData = {
  insights?: {
    sentiment: string;
    conversion_probability: number;
    key_pain_points: string[];
    suggested_actions: string[];
  };
  summary?: string;
  generated_at: string;
};

export default function AIInsights({ 
  entityId, 
  type = "deal" 
}: { 
  entityId: string; 
  type?: "deal" | "lead" 
}) {
  const [data, setData] = useState<AIInsightData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getStoredToken();
      const endpoint = type === "deal" 
        ? `/intelligence/deals/${entityId}/insights` 
        : `/intelligence/leads/${entityId}/summary`;
      
      const response = await apiRequest<AIInsightData>(endpoint, { token: token ?? undefined });
      setData(response);
    } catch (err) {
      console.error("AI Insight Error:", err);
      setError("Failed to generate AI insights.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (entityId) {
      void fetchInsights();
    }
  }, [entityId]);

  if (loading) {
    return (
      <div className="bg-slate-900/40 backdrop-blur-sm border border-indigo-500/20 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px] animate-pulse">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mb-4" />
        <p className="text-indigo-300/60 text-sm font-medium">Analyzing record with Niti AI...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-red-950/20 border border-red-500/20 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[200px]">
        <p className="text-red-400/80 text-sm mb-4">{error || "No AI insights available."}</p>
        <button 
          onClick={() => void fetchInsights()}
          className="flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-red-500/10 hover:bg-red-500/20 transition-colors rounded-full text-red-400"
        >
          <RefreshCcw className="w-3 h-3" />
          Retry Analysis
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900/60 backdrop-blur-xl border border-indigo-500/30 rounded-2xl overflow-hidden group">
      <div className="p-5 border-b border-indigo-500/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">AI Sales Intelligence</h3>
            <p className="text-[10px] text-indigo-300/50 uppercase font-bold tracking-widest mt-0.5">NitiCRM Intelligence v1.0</p>
          </div>
        </div>
        <button 
          onClick={() => void fetchInsights()}
          className="p-2 hover:bg-indigo-500/10 rounded-lg transition-colors text-indigo-400/60 hover:text-indigo-400"
          title="Refresh Insights"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {data.summary && (
          <div>
            <label className="text-[10px] font-bold text-indigo-300/40 uppercase tracking-widest mb-3 block">Perspective Summary</label>
            <p className="text-sm text-indigo-100/90 leading-relaxed italic border-l-2 border-indigo-500/30 pl-4 py-1">
              "{data.summary}"
            </p>
          </div>
        )}

        {data.insights && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Sentiment</label>
                <span className="text-lg font-bold text-emerald-400">{data.insights.sentiment}</span>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Win Prob.</label>
                <span className="text-lg font-bold text-indigo-400">{(data.insights.conversion_probability * 100).toFixed(0)}%</span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-indigo-300/40 uppercase tracking-widest mb-3 block">Next Best Actions</label>
              <div className="space-y-2">
                {data.insights.suggested_actions.map((action, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/10 rounded-xl transition-all cursor-pointer group/action">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400 group-hover/action:scale-110 transition-transform">{i+1}</div>
                    <span className="text-sm text-indigo-100/80 group-hover/action:text-white transition-colors">{action}</span>
                    <ArrowRight className="w-3 h-3 ml-auto text-indigo-500/0 group-hover/action:text-indigo-400 transition-all opacity-0 group-hover/action:opacity-100 group-hover/action:translate-x-1" />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      
      <div className="px-6 py-3 bg-indigo-500/5 border-t border-indigo-500/10 flex items-center justify-between">
        <span className="text-[10px] text-slate-500 font-medium">Model: gpt-4-turbo-preview</span>
        <span className="text-[10px] text-slate-500 font-medium italic">Refined {new Date(data.generated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );
}
