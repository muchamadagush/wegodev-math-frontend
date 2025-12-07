/**
 * Utility functions untuk formatting tanggal dari epoch milliseconds
 * Backend menggunakan Int64 epoch milliseconds (contoh: 1701928391000)
 */

/**
 * Format epoch milliseconds ke string tanggal (format: DD/MM/YYYY)
 * @param epoch - Unix timestamp dalam milliseconds
 * @returns String tanggal terformat atau "-" jika invalid
 */
export function formatDate(epoch?: number | null): string {
  if (!epoch || epoch === 0) {
    return '-'
  }

  try {
    const date = new Date(epoch)
    
    // Validasi apakah date valid
    if (isNaN(date.getTime())) {
      return '-'
    }

    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return '-'
  }
}

/**
 * Format epoch milliseconds ke string tanggal + waktu (format: DD/MM/YYYY HH:mm:ss)
 * @param epoch - Unix timestamp dalam milliseconds
 * @returns String tanggal dan waktu terformat atau "-" jika invalid
 */
export function formatDateTime(epoch?: number | null): string {
  if (!epoch || epoch === 0) {
    return '-'
  }

  try {
    const date = new Date(epoch)
    
    // Validasi apakah date valid
    if (isNaN(date.getTime())) {
      return '-'
    }

    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  } catch (error) {
    console.error('Error formatting datetime:', error)
    return '-'
  }
}

/**
 * Format epoch milliseconds ke string tanggal + waktu singkat (format: DD/MM/YYYY HH:mm)
 * @param epoch - Unix timestamp dalam milliseconds
 * @returns String tanggal dan waktu terformat atau "-" jika invalid
 */
export function formatDateTimeShort(epoch?: number | null): string {
  if (!epoch || epoch === 0) {
    return '-'
  }

  try {
    const date = new Date(epoch)
    
    // Validasi apakah date valid
    if (isNaN(date.getTime())) {
      return '-'
    }

    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  } catch (error) {
    console.error('Error formatting datetime short:', error)
    return '-'
  }
}

/**
 * Format epoch milliseconds ke relative time (contoh: "2 hari yang lalu")
 * @param epoch - Unix timestamp dalam milliseconds
 * @returns String relative time atau "-" jika invalid
 */
export function formatRelativeTime(epoch?: number | null): string {
  if (!epoch || epoch === 0) {
    return '-'
  }

  try {
    const date = new Date(epoch)
    
    // Validasi apakah date valid
    if (isNaN(date.getTime())) {
      return '-'
    }

    const now = Date.now()
    const diffMs = now - epoch
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffSec < 60) {
      return 'Baru saja'
    } else if (diffMin < 60) {
      return `${diffMin} menit yang lalu`
    } else if (diffHour < 24) {
      return `${diffHour} jam yang lalu`
    } else if (diffDay < 30) {
      return `${diffDay} hari yang lalu`
    } else {
      return formatDate(epoch)
    }
  } catch (error) {
    console.error('Error formatting relative time:', error)
    return '-'
  }
}

/**
 * Check apakah subscription masih aktif berdasarkan validUntil
 * @param validUntil - Unix timestamp dalam milliseconds
 * @returns boolean - true jika masih aktif
 */
export function isSubscriptionActive(validUntil?: number | null): boolean {
  if (!validUntil || validUntil === 0) {
    return false
  }

  return validUntil > Date.now()
}

/**
 * Get remaining days dari subscription
 * @param validUntil - Unix timestamp dalam milliseconds
 * @returns number - sisa hari atau 0 jika sudah expired
 */
export function getRemainingDays(validUntil?: number | null): number {
  if (!validUntil || validUntil === 0) {
    return 0
  }

  const diffMs = validUntil - Date.now()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
  
  return Math.max(0, diffDays)
}
