import React, { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { Globe, Play, Square, Mic, Info, X, ChevronRight, Check } from 'lucide-react';

const TutorialOverlay = () => {
    const { tutorialMode, setTutorialMode, t, language, setActiveHotspot } = useAppContext();
    const [step, setStep] = useState(0);

    const steps = [
        {
            title: language === 'he' ? "ברוכים הבאים ל-BeeTech" : "Welcome to BeeTech",
            desc: language === 'he' ? "בואו נכיר את המכשיר בסיור קצר." : "Let's take a quick tour of the device.",
            hotspot: null
        },
        {
            title: language === 'he' ? "הדלקת המכשיר" : "Power On",
            desc: language === 'he' ? "לחצו והגלישו את מתג ההפעלה בצד ימין כדי להדליק את המכשיר." : "Slide the power switch on the right side to turn on the device.",
            hotspot: "power"
        },
        {
            title: language === 'he' ? "הקלטה מהירה" : "Quick Record",
            desc: language === 'he' ? "לחצו על כפתור ה-REC האדום להתחלת הקלטה מיידית." : "Press the red REC button to start recording instantly.",
            hotspot: "rec"
        },
        {
            title: language === 'he' ? "עצירה והאזנה" : "Stop & Play",
            desc: language === 'he' ? "לחצו STOP לעצירת ההקלטה, ו-PLAY כדי להאזין מחדש." : "Press STOP to stop recording, and PLAY to listen.",
            hotspot: "play"
        }
    ];

    useEffect(() => {
        if (tutorialMode) {
            setActiveHotspot(steps[step].hotspot);
        } else {
            setActiveHotspot(null);
        }
    }, [step, tutorialMode]);

    if (!tutorialMode) return null;

    const alignmentClass = language === 'he' 
        ? 'bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-12' 
        : 'bottom-6 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-12';

    return (
        <div className={`absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto ${alignmentClass} z-50 flex items-center justify-center pointer-events-auto transition-opacity duration-500 ${language === 'he' ? 'dir-rtl' : 'dir-ltr'}`}>
            <div className="bg-[#111315]/90 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl w-[320px] md:w-[360px] shadow-2xl relative overflow-hidden">
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#4ade80]"></div>
                
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{steps[step].title}</h2>
                <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed">{steps[step].desc}</p>
                
                <div className="flex justify-between items-center">
                    <div className="flex gap-1.5">
                        {steps.map((_, i) => (
                            <div key={i} className={`h-2 rounded-full transition-all ${i === step ? 'w-6 bg-[#4ade80]' : 'w-2 bg-white/20'}`}></div>
                        ))}
                    </div>
                    
                    <div className="flex gap-2">
                        <button 
                            onClick={() => {
                                setTutorialMode(false);
                                setActiveHotspot(null);
                            }}
                            className="px-3 md:px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                        >
                            {language === 'he' ? "דלג" : "Skip"}
                        </button>
                        
                        <button 
                            onClick={() => {
                                if (step < steps.length - 1) {
                                    setStep(step + 1);
                                } else {
                                    setTutorialMode(false);
                                    setActiveHotspot(null);
                                }
                            }}
                            className="flex items-center gap-1.5 px-4 md:px-5 py-2 md:py-2.5 bg-[#4ade80] hover:bg-[#22c55e] text-black rounded-lg font-bold transition-all shadow-lg shadow-[#4ade80]/20"
                        >
                            {step < steps.length - 1 ? (
                                <>
                                    {language === 'he' ? "הבא" : "Next"}
                                    <ChevronRight size={16} className={language === 'he' ? 'rotate-180' : ''} />
                                </>
                            ) : (
                                <>
                                    {language === 'he' ? "התחל" : "Start"}
                                    <Check size={16} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const MainUI = () => {
    const { 
        language, 
        setLanguage, 
        t, 
        deviceState, 
        recordingTime, 
        audioUrl,
        simulationMode
    } = useAppContext();
    const { handleStartRecording, handleStopRecording, handlePlayAudio } = useAudioRecorder();
    const [showSpecs, setShowSpecs] = useState(false);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className={`absolute inset-0 pointer-events-none flex flex-col justify-between ${language === 'he' ? 'dir-rtl' : 'dir-ltr'}`}>
            
            {/* Tutorial Overlay */}
            <TutorialOverlay />

            {/* Header */}
            <header className="p-6 md:p-8 flex justify-between items-start pointer-events-auto">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-white/10 shadow-lg">
                        {/* Minimalist BeeTech Logo representation */}
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 18C12 18 8 16 8 12C8 8 16 8 16 12C16 16 12 18 12 18Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 8C12 8 8 4 12 4C16 4 12 8 12 8Z" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 12C8 12 2 10 2 12C2 14 8 12 8 12Z" fill="#FACC15"/>
                            <path d="M16 12C16 12 22 10 22 12C22 14 16 12 16 12Z" fill="#FACC15"/>
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">{t.title}</h1>
                        <p className="text-gray-400 text-sm font-medium">{t.subtitle}</p>
                    </div>
                </div>

                <button 
                    onClick={() => setLanguage(language === 'en' ? 'he' : 'en')}
                    className="flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white text-sm font-medium transition-all border border-white/5"
                >
                    <Globe size={16} />
                    {language === 'en' ? 'עברית' : 'English'}
                </button>
            </header>

            {/* Simulation Warning */}
            {simulationMode && (
                <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 pointer-events-auto backdrop-blur-md shadow-xl animate-fade-in">
                    <Info size={16} />
                    {t.statusError}
                </div>
            )}

            {/* Specs Overlay */}
            {showSpecs && (
                <div className="absolute inset-x-4 inset-y-24 md:inset-auto md:right-8 md:top-32 md:w-96 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 overflow-y-auto pointer-events-auto shadow-2xl animate-fade-in z-50">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">{t.specsTitle}</h2>
                        <button onClick={() => setShowSpecs(false)} className="text-gray-400 hover:text-white p-2">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {t.specs.map((spec, idx) => (
                            <div key={idx} className="flex justify-between items-start border-b border-white/5 pb-2">
                                <span className="text-gray-400 text-sm">{spec.label}</span>
                                <span className="text-white text-sm font-medium text-right max-w-[60%]">{spec.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom Controls Area */}
            <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-end gap-6 pointer-events-auto">
                <div className="max-w-md w-full md:w-auto bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
                    <h3 className="text-white font-medium mb-2">{t.howItWorks}</h3>
                    <ul className="space-y-2 text-sm text-gray-400 mb-6">
                        {t.howToUse.map((step, i) => (
                            <li key={i} className="flex gap-2">
                                <span className="text-yellow-400 opacity-50">{i + 1}.</span>
                                {step}
                            </li>
                        ))}
                    </ul>

                    {/* Interactive Controls Panel */}
                    <div className="glass-panel p-4 rounded-xl border border-white/5 bg-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="text-white font-mono text-xl w-16">
                                {formatTime(recordingTime)}
                            </div>
                            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {deviceState === 'off' ? 'POWER OFF' :
                                 deviceState === 'idle' ? t.statusIdle : 
                                 deviceState === 'recording' ? <span className="text-red-400">{t.statusRecording}</span> : 
                                 <span className="text-yellow-400">{t.statusPlaying}</span>}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button 
                                onClick={handleStartRecording}
                                disabled={deviceState !== 'idle'}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${deviceState === 'idle' ? 'bg-black border border-white/20 hover:border-red-500 text-white' : 'bg-black/50 text-gray-600 cursor-not-allowed'}`}
                                title="REC"
                            >
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            </button>
                            
                            <button 
                                onClick={handleStopRecording}
                                disabled={deviceState === 'idle' || deviceState === 'off'}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${(deviceState !== 'idle' && deviceState !== 'off') ? 'bg-black border border-white/20 hover:border-white text-white' : 'bg-black/50 text-gray-600 cursor-not-allowed'}`}
                                title="STOP"
                            >
                                <Square size={16} fill="currentColor" />
                            </button>

                            <button 
                                onClick={() => handlePlayAudio(audioUrl, simulationMode)}
                                disabled={deviceState !== 'idle' || (!audioUrl && !simulationMode)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${(deviceState === 'idle' && (audioUrl || simulationMode)) ? 'bg-black border border-white/20 hover:border-white text-white' : 'bg-black/50 text-gray-600 cursor-not-allowed'}`}
                                title="PLAY"
                            >
                                <Play size={18} fill="currentColor" className="ml-1" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <button 
                        onClick={() => setShowSpecs(!showSpecs)}
                        className="flex-1 md:flex-none px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white rounded-xl font-medium transition-all text-sm border border-white/10"
                    >
                        {t.viewSpecs}
                    </button>
                    <button 
                        className="flex-1 md:flex-none px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl font-medium shadow-md shadow-yellow-400/20 transition-all text-sm"
                    >
                        {t.contactSales}
                    </button>
                </div>
            </div>
            
        </div>
    );
}

export default MainUI;
