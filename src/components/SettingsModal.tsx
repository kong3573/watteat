'use client';

import React, { useState, useEffect } from 'react';
import {
  AffiliateConfig,
  getStoredAffiliateConfig,
  saveAffiliateConfig,
  getAffiliateClickStats,
  clearAffiliateClickStats,
} from '@/lib/affiliate';
import { X, Save, Check, Key, ShieldCheck, BarChart3, RotateCcw, ExternalLink } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'config' | 'stats'>('config');
  const [config, setConfig] = useState<AffiliateConfig>({
    coupangTrackingId: '',
    coupangSubId: '',
    coupangAccessKey: '',
    coupangSecretKey: '',
    amazonTag: '',
  });
  const [isSaved, setIsSaved] = useState(false);
  const [stats, setStats] = useState<{
    totalClicks: number;
    coupangClicks: number;
    amazonClicks: number;
    instacartClicks: number;
    recentLogs: Array<{
      id: string;
      timestamp: number;
      menuName: string;
      itemName: string;
      platform: string;
    }>;
  }>({
    totalClicks: 0,
    coupangClicks: 0,
    amazonClicks: 0,
    instacartClicks: 0,
    recentLogs: [],
  });

  useEffect(() => {
    if (isOpen) {
      setConfig(getStoredAffiliateConfig());
      setStats(getAffiliateClickStats());
      setIsSaved(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveAffiliateConfig(config);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const handleClearStats = () => {
    if (confirm('클릭 통계 기록을 초기화하시겠습니까?')) {
      clearAffiliateClickStats();
      setStats(getAffiliateClickStats());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative border border-gray-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2.5 mb-4">
          <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-gray-900">파트너스 수익화 & 통계</h3>
            <p className="text-xs text-gray-500">쿠팡 파트너스 트래킹 ID 및 성과 지표 관리</p>
          </div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex border-b border-gray-200 mb-5 text-xs font-bold">
          <button
            onClick={() => setActiveTab('config')}
            className={`pb-2.5 px-3 flex items-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'config'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>수익화 설정</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('stats');
              setStats(getAffiliateClickStats());
            }}
            className={`pb-2.5 px-3 flex items-center gap-1.5 transition-colors border-b-2 ${
              activeTab === 'stats'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-400 hover:text-gray-700'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>클릭 통계 ({stats.totalClicks}회)</span>
          </button>
        </div>

        {activeTab === 'config' ? (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                🇰🇷 쿠팡 파트너스 Tracking ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={config.coupangTrackingId}
                onChange={(e) => setConfig({ ...config, coupangTrackingId: e.target.value })}
                placeholder="예: AF7547927"
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none font-mono font-semibold"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                현재 적용된 트래킹 ID: <strong className="text-red-600">{config.coupangTrackingId || '미설정'}</strong>
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                🇰🇷 쿠팡 파트너스 SubID (유입 채널 구분값)
              </label>
              <input
                type="text"
                value={config.coupangSubId || ''}
                onChange={(e) => setConfig({ ...config, coupangSubId: e.target.value })}
                placeholder="예: whattoeat_web"
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none"
              />
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  🔑 쿠팡 파트너스 Access Key (선택, 공식 단축 딥링크 생성용)
                </label>
                <input
                  type="text"
                  value={config.coupangAccessKey || ''}
                  onChange={(e) => setConfig({ ...config, coupangAccessKey: e.target.value })}
                  placeholder="쿠팡 파트너스 API Access Key"
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  🔒 쿠팡 파트너스 Secret Key (선택)
                </label>
                <input
                  type="password"
                  value={config.coupangSecretKey || ''}
                  onChange={(e) => setConfig({ ...config, coupangSecretKey: e.target.value })}
                  placeholder="쿠팡 파트너스 API Secret Key"
                  className="w-full px-3.5 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none font-mono text-[11px]"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  * API Key가 없어도 쿠팡 파트너스 트래킹 코드가 포함된 다이렉트 검색 링크로 정상 수익이 정산됩니다.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                🇺🇸 Amazon Associates Store Tag (미국 확장용)
              </label>
              <input
                type="text"
                value={config.amazonTag}
                onChange={(e) => setConfig({ ...config, amazonTag: e.target.value })}
                placeholder="예: whattoeat-20"
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                설정 정보는 브라우저 로컬 스토리지에 안전하게 저장되며, 모든 상품 링크가 해당 코드로 자동 연결됩니다.
              </span>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSaved}
                className="w-full py-3 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>저장 완료!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>설정 저장하기</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-red-50 p-3 rounded-2xl border border-red-100">
                <span className="text-[11px] text-gray-500 block">쿠팡 클릭</span>
                <span className="text-lg font-black text-red-600">{stats.coupangClicks}</span>
              </div>
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100">
                <span className="text-[11px] text-gray-500 block">아마존 클릭</span>
                <span className="text-lg font-black text-amber-600">{stats.amazonClicks}</span>
              </div>
              <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
                <span className="text-[11px] text-gray-500 block">총 발생 클릭</span>
                <span className="text-lg font-black text-emerald-600">{stats.totalClicks}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-700">최근 클릭 이력</span>
                {stats.totalClicks > 0 && (
                  <button
                    onClick={handleClearStats}
                    className="text-[10px] text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>기록 초기화</span>
                  </button>
                )}
              </div>

              {stats.recentLogs.length === 0 ? (
                <div className="py-8 text-center bg-gray-50 rounded-2xl text-xs text-gray-400">
                  아직 상품 클릭 기록이 없습니다.
                </div>
              ) : (
                <div className="space-y-1.5 max-h-52 overflow-y-auto">
                  {stats.recentLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 bg-gray-50 rounded-xl text-[11px] flex items-center justify-between border border-gray-100"
                    >
                      <div>
                        <span className="font-bold text-gray-800">[{log.menuName}]</span>{' '}
                        <span className="text-gray-600">{log.itemName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            log.platform === 'coupang'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {log.platform.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2">
              <a
                href="https://partners.coupang.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                <span>쿠팡 파트너스 정산 대시보드 바로가기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
