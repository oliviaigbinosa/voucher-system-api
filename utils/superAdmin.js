import Admin from '../models/Admin.js'
import User from '../models/User.js'
import SuperAdmin from '../models/SuperAdmin.js'

export const FINANCE_EMAIL = 'finance@getpayedmail.com'
export const FINANCE_MANAGER_EMAIL = 'finance.manager@getpayedmail.com'

export async function findAccountByEmail(email) {
  const normalized = String(email || '').trim().toLowerCase()
  if (!normalized) return null

  const [admin, user, superAdmin] = await Promise.all([
    Admin.findOne({ email: normalized }),
    User.findOne({ email: normalized }),
    SuperAdmin.findOne({ email: normalized }),
  ])

  return superAdmin || admin || user
}

export async function isSuperAdminEmail(email) {
  const normalized = String(email || '').trim().toLowerCase()
  if (!normalized) return false

  const [admin, user, superAdmin] = await Promise.all([
    Admin.findOne({ email: normalized }),
    User.findOne({ email: normalized }),
    SuperAdmin.findOne({ email: normalized }),
  ])

  return (
    Boolean(superAdmin) ||
    admin?.role === 'super admin' ||
    user?.role === 'super admin'
  )
}

export function isFinanceRoutedVoucher(voucher) {
  const to = String(voucher?.to || '').trim().toLowerCase()
  const cc = String(voucher?.cc || '').trim().toLowerCase()
  return to === FINANCE_EMAIL || cc === FINANCE_EMAIL
}
