import { BellRing } from 'lucide-react'
import type { Announcement } from '@/types/announcement'

type AnnouncementCardProps = {
  announcement: Announcement
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  return (
    <article className="info-card announcement-card">
      <div className="announcement-meta">
        <span className="category-pill">{announcement.category}</span>
        <div className="card-icon card-icon-muted">
          <BellRing size={18} aria-hidden="true" />
        </div>
      </div>
      <div className="card-copy">
        <h4>{announcement.title}</h4>
        <p>{announcement.description}</p>
      </div>
      <span className="published-at">{announcement.publishedAt}</span>
    </article>
  )
}
