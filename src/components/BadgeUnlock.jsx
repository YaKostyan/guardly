import { LockKeyhole, ShieldCheck } from "lucide-react";

export default function BadgeUnlock({ badge, unlocked }) {
  return (
    <div className={`badge-unlock ${unlocked ? "unlocked" : ""}`}>
      <div className="badge-mark">
        {unlocked ? <ShieldCheck size={30} aria-hidden="true" /> : <LockKeyhole size={28} aria-hidden="true" />}
      </div>
      <div>
        <span>{unlocked ? "Бейдж відкрито" : "Бейдж заблоковано"}</span>
        <strong>{badge.title}</strong>
        <p>{badge.description}</p>
      </div>
    </div>
  );
}
