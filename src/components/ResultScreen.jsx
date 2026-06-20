import { AlertTriangle, ArrowRight, Check, RotateCcw, Share2, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { useState } from "react";
import BadgeUnlock from "./BadgeUnlock.jsx";
import { trackEvent } from "../lib/analytics.js";

export default function ResultScreen({ mission, result, foundEvidence, missedEvidence, onRetry }) {
  const [shareStatus, setShareStatus] = useState("");
  const success = result.outcome !== "bad";
  const actionFeedback = mission.result.actionFeedback?.[result.actionId];
  const title = result.outcome === "excellent" ? mission.result.excellentTitle : result.outcome === "medium" ? mission.result.mediumTitle : actionFeedback?.title || mission.result.badTitle;
  const copy = result.outcome === "excellent" ? mission.result.excellentExplanation : result.outcome === "medium" ? mission.result.mediumExplanation : actionFeedback?.explanation || mission.result.wrongExplanation;
  const resultLabel = success ? "Місію завершено" : actionFeedback?.label || "Місію провалено";

  async function shareResult() {
    const url = new URL(import.meta.env.BASE_URL, window.location.origin);
    url.searchParams.set("utm_source", "result_share");
    url.searchParams.set("utm_medium", "referral");
    url.searchParams.set("utm_campaign", mission.id);
    url.hash = "/demo";
    const shareData = {
      title: "Guardly — місія завершена",
      text: `Я отримав ранг ${result.rank.id} «${result.rank.title}» у місії Guardly. Спробуй розпізнати пастку з Robux.`,
      url: url.toString(),
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        trackEvent("result_share", { mission_id: mission.id, method: "native", rank: result.rank.id });
        setShareStatus("Дякуємо, що поділилися Guardly.");
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        trackEvent("result_share", { mission_id: mission.id, method: "clipboard", rank: result.rank.id });
        setShareStatus("Посилання скопійовано.");
      }
    } catch (error) {
      if (error?.name !== "AbortError") setShareStatus("Не вдалося поділитися. Спробуйте ще раз.");
    }
  }

  return (
    <section className={`result-screen-v2 ${success ? "success" : "danger"}`}>
      <div className="result-celebration">
        <div className="rank-orbit"><span>{result.rank.id}</span><i /><i /><i /></div>
        <p>{resultLabel}</p>
        <h1>{title}</h1>
        <p className="result-explanation">{copy}</p>
        <div className="result-xp"><Trophy size={20} /><strong>{result.score} XP</strong><span>{result.rank.title}</span></div>
      </div>

      <div className="result-dashboard">
        <div className="result-skill-card">
          <div><Sparkles size={20} /></div><span>Нова навичка</span><strong>{mission.badge.skill}</strong>
        </div>
        <BadgeUnlock badge={mission.badge} unlocked={success && result.rank.id !== "C"} />
        <div className="result-score-card">
          <span>Підсумок місії</span>
          <div><b>Докази</b><strong>+{result.evidenceXp}</strong></div>
          <div><b>Перевірка сайту</b><strong>+{result.domainXp}</strong></div>
          <div><b>Фінальне рішення</b><strong>+{result.finalXp}</strong></div>
          <div><b>Помилки</b><strong>{result.penaltyXp}</strong></div>
        </div>
      </div>

      <div className="result-learning">
        <div>
          <span>Що ти розпізнав</span>
          <ul>{foundEvidence.map((item) => <li key={item.id}><Check size={14} />{item.title}</li>)}</ul>
        </div>
        <div>
          <span>{missedEvidence.length ? "Що варто помічати наступного разу" : "Ідеальне розслідування"}</span>
          <ul>{missedEvidence.length ? missedEvidence.map((item) => <li key={item.id}><AlertTriangle size={14} />{item.title}</li>) : <li><ShieldCheck size={14} />Ти знайшов усі сигнали у чаті.</li>}</ul>
        </div>
      </div>

      <div className="parent-checklist-v2">
        <span>Після гри · Чеклист для батьків</span>
        <div>{mission.checklist.map((item, index) => <p key={item}><i>{index + 1}</i>{item}</p>)}</div>
      </div>

      <div className="result-actions-v2">
        <button className="result-share" type="button" onClick={shareResult}><Share2 size={17} /> Поділитися результатом</button>
        <button type="button" onClick={onRetry}><RotateCcw size={17} /> Пройти ще раз</button>
        <a href="#/missions">До інших місій <ArrowRight size={17} /></a>
      </div>
      {shareStatus && <p className="share-status" role="status">{shareStatus}</p>}
    </section>
  );
}
