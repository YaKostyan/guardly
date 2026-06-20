import { Bell, Gamepad2, Gift, Headphones, HelpCircle, Inbox, Mic, MoreHorizontal, MousePointerClick, Plus, Search, Settings, Users } from "lucide-react";
import EvidenceHotspot from "./EvidenceHotspot.jsx";

function hotspotState(hotspot, foundEvidence, clickedDecoys) {
  if (!hotspot) return "";
  if (hotspot.type === "evidence" && foundEvidence.includes(hotspot.id)) return "found";
  if (hotspot.type === "decoy" && clickedDecoys.includes(hotspot.id)) return "miss";
  return "";
}

export default function ChatInvestigationScene({ mission, foundEvidence, clickedDecoys, openedLink, onInspect, onOpenDangerLink }) {
  const hotspots = new Map(mission.hotspots.map((item) => [item.id, item]));
  function renderHotspot(id, children, className = "") {
    const item = hotspots.get(id);
    return (
      <EvidenceHotspot item={item} state={hotspotState(item, foundEvidence, clickedDecoys)} onInspect={onInspect} className={className}>
        {children}
      </EvidenceHotspot>
    );
  }

  return (
    <section className="discord-game-window" aria-label="Чат із підозрілим користувачем">
      <aside className="discord-server-rail" aria-hidden="true">
        <div className="server-home"><Gamepad2 size={20} /></div>
        <span />
        <div className="server-icon active">R</div>
        <div className="server-icon">G</div>
        <div className="server-icon muted"><Plus size={17} /></div>
      </aside>

      <aside className="discord-channel-list">
        <div className="server-name">ROBLOX UA <MoreHorizontal size={17} /></div>
        <div className="channel-group">
          <span>ІНФОРМАЦІЯ</span>
          <p># правила</p>
          <p># новини</p>
        </div>
        <div className="channel-group">
          <span>СПІЛЬНОТА</span>
          <p># загальний</p>
          <p className="active"># подарунки <Gift size={14} /></p>
          <p># обмін</p>
        </div>
        <div className="voice-channel"><span>Голосовий канал</span><p><Users size={14} /> Лобі</p></div>
        <div className="discord-user-bar">
          <div className="player-avatar">К</div>
          <div><strong>Костя</strong><span>онлайн</span></div>
          <Mic size={15} /><Headphones size={15} /><Settings size={15} />
        </div>
      </aside>

      <div className="discord-chat-panel">
        <header className="discord-chat-header">
          <div><strong># подарунки</strong><span>Розіграші та події спільноти</span></div>
          <div aria-hidden="true"><Bell size={17} /><Inbox size={17} /><HelpCircle size={17} /><div className="discord-search">Пошук <Search size={13} /></div></div>
        </header>

        <div className="mission-prompt-bar">
          <span className="live-pulse" />
          <div><strong>Завдання: знайди 3 сигнали пастки</strong><span>Клікай лише на деталі, які справді доводять ризик.</span></div>
          <b>{foundEvidence.length}/3</b>
        </div>
        <div className="mobile-tap-guide">
          <MousePointerClick size={16} aria-hidden="true" />
          Натискай прямо на підозрілі слова, ім'я або посилання.
        </div>

        <div className="discord-message-feed">
          <div className="channel-welcome">
            <div><Gift size={28} /></div>
            <h2>Ласкаво просимо до #подарунки</h2>
            <p>Тут учасники діляться подіями та розіграшами.</p>
          </div>

          <article className="discord-message stranger-message">
            <div className="message-avatar-wrap">
              {renderHotspot("avatar", <span>{mission.sender.avatar}</span>, "real-avatar-hotspot")}
              <i />
            </div>
            <div className="message-content">
              <div className="message-author-line">
                {renderHotspot("username", <strong>{mission.sender.nickname}</strong>, "username-hotspot-v2")}
                {renderHotspot("profile-badge", <span className="fake-bot-badge">GIFT HELPER</span>, "badge-hotspot-v2")}
                {renderHotspot("message-time", <time>сьогодні о {mission.sender.time}</time>, "time-hotspot-v2")}
              </div>
              <p>Привіт! Ти у списку переможців. Можу дати {renderHotspot("free-robux", <b>5000 Robux безкоштовно</b>, "text-hotspot-v2")}.</p>
              <p>Ось форма отримання. {renderHotspot("login-request", <b>Увійди через Roblox</b>, "text-hotspot-v2")}, і Robux одразу прийдуть на акаунт.</p>
              <div className={`discord-link-preview ${openedLink ? "opened" : ""}`}>
                <div className="link-preview-accent" />
                <div>
                  <span>RBX GIFT · REWARD CENTER</span>
                  {renderHotspot("fake-domain", <strong>rbx-gift.example/claim-now</strong>, "domain-hotspot-v2")}
                  <p>Забери нагороду, поки вона доступна.</p>
                </div>
                <button type="button" onClick={onOpenDangerLink} disabled={openedLink}>{openedLink ? "Відкрито" : "Отримати"}</button>
              </div>
              <p className="pressure-message">{renderHotspot("time-pressure", <b>Тільки швидко.</b>, "text-hotspot-v2")} Посилання працює ще 5 хвилин.</p>
            </div>
          </article>
        </div>

        <div className="discord-composer" aria-hidden="true">
          <Plus size={18} />
          <span>Написати у #подарунки</span>
          <Gift size={17} />
        </div>
      </div>
    </section>
  );
}
