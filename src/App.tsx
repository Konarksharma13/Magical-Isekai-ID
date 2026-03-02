/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Truck, Skull, Wand2, Swords, ScrollText, Smile, ShieldCheck, Sparkles as SparkleIcon, Download, RotateCcw } from "lucide-react";
import { toPng } from "html-to-image";

const SparkleBackground = () => {
  const [sparkles, setSparkles] = useState<{ id: number; top: string; left: string; size: string; delay: string }[]>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 2}px`,
      delay: `${Math.random() * 5}s`,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
};

export default function App() {
  const [method, setMethod] = useState("Truck-kun");
  const [role, setRole] = useState("");
  const [cheatSkill, setCheatSkill] = useState("");
  const [quest, setQuest] = useState("");
  const [plotArmor, setPlotArmor] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);

  const [cardData, setCardData] = useState<any>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const arrivalMethods = [
    { id: "Truck-kun", icon: <Truck className="w-6 h-6" />, label: "Truck-kun" },
    { id: "Overwork", icon: <Skull className="w-6 h-6" />, label: "Overwork" },
    { id: "Summoned", icon: <Wand2 className="w-6 h-6" />, label: "Summoned" },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate system analysis
    setTimeout(() => {
     const departments = [
        "Reincarnation Bureau",
        "Protagonist Union",
        "Accidental Summonings",
        "Kingdom of Missteps",
        "Quest Complexity Guild",
        "Plot Armor Division",
        "Sidekick Registry",
        "Slime Studies Dept.",
        "Why Is This Happening Council"
      ];

      const guildNames = [
        "Dev.to Arcane Engineering Guild",
        "The Binary Shogunate",
        "Crimson Commit Consortium",
        "The Refactor Vanguard",
        "Obsidian Stack Assembly",
        "Celestial Systems Collective",
        "Phantom Protocol Order",
        "Quantum Code Dominion",
        "The Runtime Ronin",
        "Infinite Loop Covenant",
        "Cloudblade Architects",
        "The Debugging Syndicate",
        "Neon Framework Legion",
        "Eclipse Infrastructure Council",
        "The Algorithm Ascendancy",
        "Stackforge Sovereignty",
        "Mythic Deployment Directorate",
        "Void Compiler Society",
        "The Data Dragon Accord",
        "Apex Dev Dominion"
      ];

      const rankData: Record<string, string[]> = {
        "National Level": ["System Monarch", "Tech Titan", "Reality Compiler", "Omniscient Architect", "The Production Deity"],
        "S Rank": ["Code Overlord", "Supreme Architect", "DevOps Shogun", "Algorithm Ascendant", "Master of the Stack"],
        "A Rank": ["Staff Spellcaster", "Domain Sovereign", "Lead Systems Sage", "Cloud Dragon Engineer", "Grand Refactorist"],
        "B Rank": ["Senior Codeblade", "Architecture Guardian", "Principal Debugger", "Performance Warlock", "Infrastructure Commander"],
        "C Rank": ["System Shaper", "Full-Stack Knight", "API Conjurer", "Refactor Samurai", "Data Warden"],
        "D Rank": ["Feature Crafter", "Bug Slayer", "Stack Adept", "Code Vanguard", "Module Tactician"],
        "E Rank": ["Code Initiate", "Script Trainee", "Debug Novice", "Junior Devling", "Commit Apprentice"]
      };

      const rarities = ["Common", "Rare", "Epic", "Legendary"];
      const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];

      let rankTitle = "";
      if (randomRarity === "Legendary") rankTitle = "National Level";
      else if (randomRarity === "Epic") rankTitle = "S Rank";
      else if (randomRarity === "Rare") rankTitle = ["A Rank", "B Rank"][Math.floor(Math.random() * 2)];
      else rankTitle = ["C Rank", "D Rank", "E Rank"][Math.floor(Math.random() * 3)];

      const rankNames = rankData[rankTitle];
      const randomRankName = rankNames[Math.floor(Math.random() * rankNames.length)];
      const finalRank = `${rankTitle} - ${randomRankName}`;

      const randomGuild = guildNames[Math.floor(Math.random() * guildNames.length)];

      const newCardData = {
        id: Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }),
        issuedBy: departments[Math.floor(Math.random() * departments.length)],
        guild: randomGuild,
        method,
        rank: finalRank,
        role: role || "Cannon Fodder",
        cheatSkill: cheatSkill || "None (Sad)",
        quest: quest || "Surviving the first 5 minutes",
        plotArmor,
        rarity: randomRarity
      };

      setCardData(newCardData);
      setIsGenerating(false);
    }, 2500);
  };

  const resetForm = () => {
    setMethod("Truck-kun");
    setRole("");
    setCheatSkill("");
    setQuest("");
    setPlotArmor(3);
    setCardData(null);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 1,
        pixelRatio: 2,
        backgroundColor: 'transparent',
      });
      
      const link = document.createElement('a');
      link.download = `isekai-card-${cardData.id}.png`;
      link.href = dataUrl;
      link.click();
      
      // Reset after download
      setTimeout(resetForm, 500);
    } catch (err) {
      console.error('Oops, something went wrong!', err);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center relative">
      <SparkleBackground />
      
      {/* Title Section */}
      <header className="mb-12 text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl md:text-7xl font-whimsical text-transparent bg-clip-text bg-gradient-to-r from-magical-pink via-magical-cyan to-magical-purple drop-shadow-[0_0_15px_rgba(255,102,204,0.5)] mb-4"
        >
          MAGICAL ISEKAI ID
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-magical-cyan italic tracking-[0.3em] uppercase text-sm font-whimsical"
        >
          ✨ Your Portal to Another World ✨
        </motion.p>
      </header>

      {/* Main Container Layout */}
      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
        
        {/* Input Form Section */}
        <section id="form-section" className="glass-panel p-6 flex flex-col">
          <h2 className="text-2xl text-fantasy-gold-light mb-6 border-b border-fantasy-gold/30 pb-2 flex items-center gap-2">
            <ScrollText className="w-6 h-6" /> Character Details
          </h2>
          
          <div className="space-y-6">
            {/* Method of Arrival */}
            <div>
              <label className="magical-label">Method of Arrival</label>
              <div className="grid grid-cols-3 gap-3">
                {arrivalMethods.map((m) => (
                  <div 
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`radio-card flex flex-col items-center gap-2 text-center ${method === m.id ? 'selected' : ''}`}
                  >
                    <div className={method === m.id ? 'text-fantasy-gold' : 'text-slate-400'}>
                      {m.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Basic Info Grid */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="magical-label">Party Role</label>
                <div className="relative">
                  <Swords className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="e.g. Meat Shield" 
                    className="magical-input pl-10 pr-4" 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Cheat Skill */}
            <div>
              <label className="magical-label">Useless Cheat Skill</label>
              <div className="relative">
                <Wand2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="e.g. Infinite Salt Generation" 
                  className="magical-input pl-10 pr-4" 
                  value={cheatSkill}
                  onChange={(e) => setCheatSkill(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Textareas */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="magical-label mb-0">Current Quest</label>
                  <span className={`text-[10px] font-whimsical ${quest.length >= 25 ? 'text-magical-pink' : 'text-slate-500'}`}>
                    {quest.length}/40
                  </span>
                </div>
                <textarea 
                  placeholder="What are you doing here?" 
                  className="magical-input h-20 resize-none pr-4 pl-2" 
                  value={quest}
                  maxLength={40}
                  onChange={(e) => setQuest(e.target.value)}
                />
              </div>
            </div>

            {/* Slider & Info */}
            <div className="grid grid-cols-1 gap-6 items-end">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="magical-label mb-0">Plot Armor</label>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < plotArmor ? 'fill-fantasy-gold text-fantasy-gold' : 'text-slate-600'}`} />
                    ))}
                  </div>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={plotArmor} 
                  onChange={(e) => setPlotArmor(parseInt(e.target.value))}
                  className="star-slider" 
                />
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !role.trim() || !cheatSkill.trim() || !quest.trim()}
                className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest border transition-all duration-300 relative overflow-hidden ${
                  (isGenerating || !role.trim() || !cheatSkill.trim() || !quest.trim())
                  ? 'bg-slate-800 text-slate-500 border-white/5 cursor-not-allowed opacity-50' 
                  : 'bg-fantasy-gold text-fantasy-void border-fantasy-gold-light hover:bg-fantasy-gold-light hover:scale-[1.02] active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                }`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full"
                    />
                    Analyzing Skills...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <ShieldCheck className="w-5 h-5" /> Forge Your Destiny
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Generated Card Preview Section */}
        <section id="preview-section" className="flex flex-col items-center">
          <h2 className="text-3xl text-magical-cyan mb-8 self-start lg:self-center font-whimsical flex items-center gap-3">
            <SparkleIcon className="w-6 h-6 animate-pulse" /> Magical Preview
          </h2>
          
          <div ref={cardRef} className="bg-transparent p-8">
            <div 
              className={`w-full max-w-[400px] min-h-[600px] rounded-3xl bg-fantasy-dark/95 flex flex-col relative overflow-hidden transition-all duration-700 ${
              cardData?.rarity === 'Common' ? 'glow-border-cyan' :
              cardData?.rarity === 'Rare' ? 'glow-border-purple' :
              cardData?.rarity === 'Epic' ? 'glow-border-pink' :
              cardData?.rarity === 'Legendary' ? 'border-4 border-fantasy-gold shadow-[0_0_40px_rgba(255,204,51,0.8)]' :
              'border-2 border-white/20'
            }`}>
              {/* Anime Background Image */}
              {cardData && (
                <div className="absolute inset-0 z-0">
                  <img 
                    src={`https://picsum.photos/seed/${cardData.id}/800/1200`} 
                    alt="Anime Background" 
                    className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-fantasy-dark/80 via-fantasy-dark/40 to-fantasy-dark/90"></div>
                </div>
              )}
  
              {/* Faint Arcane Watermark */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none flex items-center justify-center z-0">
                <div className="w-80 h-80 border-8 border-fantasy-gold rounded-full rotate-45 flex items-center justify-center">
                  <div className="w-60 h-60 border-4 border-fantasy-gold rounded-full -rotate-90 flex items-center justify-center">
                     <div className="w-40 h-40 border-2 border-fantasy-gold rounded-full rotate-12"></div>
                  </div>
                </div>
              </div>
  
            <AnimatePresence>
              {isGenerating && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-fantasy-dark/95 backdrop-blur-xl p-8 text-center"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [0, 360],
                    }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="w-32 h-32 border-4 border-magical-cyan rounded-full mb-8 flex items-center justify-center relative"
                  >
                    <div className="absolute inset-0 border-4 border-magical-pink rounded-full border-dashed animate-pulse"></div>
                    <SparkleIcon className="w-12 h-12 text-magical-cyan animate-bounce" />
                  </motion.div>
                  <h3 className="font-whimsical text-magical-cyan text-2xl mb-3 animate-pulse">✨ CASTING SUMMON ✨</h3>
                  <p className="font-whimsical text-slate-300 text-sm tracking-widest uppercase">Weaving your destiny in the stars...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {cardData ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 h-full flex flex-col p-6 font-tech"
              >
                  {/* Rarity Stamp */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20 rotate-[-25deg] z-0">
                    <div className={`border-8 px-8 py-4 rounded-xl text-6xl font-silkscreen uppercase tracking-widest ${
                      cardData.rarity === 'Legendary' ? 'border-fantasy-gold text-fantasy-gold' :
                      cardData.rarity === 'Epic' ? 'border-purple-500 text-purple-500' :
                      cardData.rarity === 'Rare' ? 'border-blue-500 text-blue-500' :
                      'border-slate-500 text-slate-500'
                    }`}>
                      {cardData.rarity}
                    </div>
                  </div>
  
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-fantasy-gold font-blanka text-lg leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] uppercase">{cardData.guild}</h3>
                      <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Official Guild Document</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">#{cardData.id}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{cardData.date}</p>
                    </div>
                  </div>
  
                  {/* Main Content */}
                  <div className="space-y-4 flex-grow relative z-10">
                    <div className="bg-black/40 backdrop-blur-sm border-l-4 border-fantasy-gold p-2 rounded-r-lg">
                      <p className="text-[9px] uppercase text-fantasy-gold-light/80 tracking-widest font-bold">Arrival Method</p>
                      <p className="text-lg font-yomogi text-white drop-shadow-md">{cardData.method}</p>
                    </div>
  
                    <div className="bg-black/40 backdrop-blur-sm border-l-4 border-slate-400 p-2 rounded-r-lg">
                      <p className="text-[9px] uppercase text-slate-400 tracking-widest font-bold">Rank</p>
                      <p className="text-md font-yomogi text-white drop-shadow-md">{cardData.rank}</p>
                    </div>
  
                    <div className="bg-black/40 backdrop-blur-sm border-l-4 border-slate-400 p-2 rounded-r-lg">
                      <p className="text-[9px] uppercase text-slate-400 tracking-widest font-bold">Role</p>
                      <p className="text-md font-yomogi text-white drop-shadow-md">{cardData.role}</p>
                    </div>
  
                    <div className="bg-black/40 backdrop-blur-sm border-l-4 border-fantasy-gold-light p-2 rounded-r-lg">
                      <p className="text-[9px] uppercase text-fantasy-gold-light/80 tracking-widest font-bold">Cheat Skill</p>
                      <p className="text-md font-yomogi text-fantasy-gold-light drop-shadow-md">{cardData.cheatSkill}</p>
                    </div>
  
                    <div className="bg-black/40 backdrop-blur-sm border-l-4 border-white/20 p-2 rounded-r-lg">
                      <p className="text-[9px] uppercase text-slate-400 tracking-widest font-bold">Current Quest</p>
                      <p className="text-sm text-slate-200 line-clamp-2 italic font-yomogi">"{cardData.quest}"</p>
                    </div>
  
                    <div className="bg-black/40 backdrop-blur-sm p-2 rounded-lg">
                      <p className="text-[9px] uppercase text-fantasy-gold-light/80 tracking-widest mb-1 font-blanka">Plot Armor</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < cardData.plotArmor ? 'fill-fantasy-gold text-fantasy-gold drop-shadow-[0_0_5px_rgba(212,175,55,0.5)]' : 'text-slate-800'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
  
                  {/* Card Footer */}
                  <div className="mt-auto pt-4 border-t border-fantasy-gold/20 flex flex-col gap-1 relative z-10">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[8px] uppercase text-slate-500 tracking-widest font-bold">Issued By</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{cardData.issuedBy}</p>
                      </div>
                      <div className={`px-4 py-1 rounded-full text-xs font-silkscreen tracking-widest shadow-lg ${
                        cardData.rarity === 'Legendary' ? 'bg-fantasy-gold text-fantasy-void ring-2 ring-fantasy-gold-light' :
                        cardData.rarity === 'Epic' ? 'bg-purple-600 text-white ring-2 ring-purple-400' :
                        cardData.rarity === 'Rare' ? 'bg-blue-600 text-white ring-2 ring-blue-400' :
                        'bg-slate-700 text-slate-300 ring-2 ring-slate-500'
                      }`}>
                        {cardData.rarity}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-16 h-16 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8 text-white/20" />
                  </div>
                  <p className="text-slate-500 italic text-sm">Fill in your details and click "Generate Card" to see your registration.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10 w-full max-w-[400px] flex flex-col gap-4">
            <button 
              disabled={!cardData}
              onClick={handleDownload}
              className={`w-full py-4 rounded-xl font-whimsical text-lg uppercase tracking-widest border transition-all duration-500 flex items-center justify-center gap-2 ${
                cardData 
                ? 'bg-magical-cyan/20 text-magical-cyan border-magical-cyan/30 hover:bg-magical-cyan/30 cursor-pointer shadow-[0_0_20px_rgba(51,255,255,0.2)]' 
                : 'bg-slate-800/50 text-slate-600 cursor-not-allowed border-white/5'
              }`}
            >
              <Download className="w-5 h-5" /> Claim Your Card
            </button>
            
            {cardData && (
              <button 
                onClick={resetForm}
                className="w-full py-3 rounded-xl font-whimsical text-sm uppercase tracking-widest text-slate-400 hover:text-magical-pink transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Start New Journey
              </button>
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-16 text-slate-600 text-xs tracking-tighter uppercase">
        &copy; 2026 Fantasy Guild • Powered by magic & coffee
      </footer>
    </div>
  );
}
