import EvidenceHotspot from "./EvidenceHotspot.jsx";

function hotspotState(hotspot, foundEvidence, clickedDecoys) {
  if (!hotspot) return "";
  if (hotspot.type === "evidence" && foundEvidence.includes(hotspot.id)) return "found";
  if (hotspot.type === "decoy" && clickedDecoys.includes(hotspot.id)) return "miss";
  return "";
}

export default function ChatInvestigationScene({
  mission,
  foundEvidence,
  clickedDecoys,
  openedLink,
  onInspect,
  onOpenDangerLink,
}) {
  const hotspots = new Map(mission.hotspots.map((item) => [item.id, item]));
  const byTarget = new Map(mission.hotspots.map((item) => [item.target, item]));

  function renderHotspot(id, children, className = "") {
    const item = hotspots.get(id);
    return (
      <EvidenceHotspot
        item={item}
        state={hotspotState(item, foundEvidence, clickedDecoys)}
        onInspect={onInspect}
        className={className}
      >
        {children}
      </EvidenceHotspot>
    );
  }

  return (
    <section className="chat-investigation-scene" aria-label="Сцена розслідування">
      <div className="discord-shell">
        <div className="discord-topbar">
          <div>
            <span className="discord-dot" />
            <strong># roblox-gifts</strong>
          </div>
          <small>Симуляція чату</small>
        </div>

        <div className="sender-card">
          {renderHotspot("avatar", <span>{mission.sender.avatar}</span>, "avatar-hotspot")}
          <div className="sender-meta">
            {renderHotspot("username", <strong>{mission.sender.nickname}</strong>, "name-hotspot")}
            <div className="sender-line">
              {renderHotspot("platform-name", <span>{mission.sender.platform}</span>, "subtle-hotspot")}
              <span>·</span>
              {renderHotspot("message-time", <span>{mission.sender.time}</span>, "subtle-hotspot")}
            </div>
          </div>
          {renderHotspot("profile-badge", <span>{mission.sender.badge}</span>, "badge-hotspot")}
        </div>

        <div className="chat-thread-game">
          {mission.chatMessages.map((message) => (
            <article className={`chat-bubble-game ${message.link ? "link-bubble" : ""}`} key={message.id}>
              <div className="bubble-author">
                <span>{mission.sender.avatar}</span>
                <strong>{mission.sender.nickname}</strong>
              </div>

              {message.link ? (
                <div className="link-row-game">
                  {renderHotspot(message.hotspotId, <span>{message.link}</span>, "link-hotspot")}
                  <button
                    type="button"
                    className={`danger-open ${openedLink ? "used" : ""}`}
                    onClick={onOpenDangerLink}
                    disabled={openedLink}
                  >
                    {message.dangerAction.label}
                  </button>
                </div>
              ) : (
                <p>
                  {message.parts.map((part, index) =>
                    part.hotspotId ? (
                      <span key={`${message.id}-${part.hotspotId}`}>
                        {renderHotspot(part.hotspotId, part.text, "inline-hotspot")}
                      </span>
                    ) : (
                      <span key={`${message.id}-${index}`}>{part.text}</span>
                    ),
                  )}
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="chat-footer-game">
          <span>Повідомлення від незнайомця</span>
          <strong>Не вводь дані акаунта без перевірки</strong>
        </div>
      </div>
    </section>
  );
}
