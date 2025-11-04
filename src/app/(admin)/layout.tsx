import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (session?.user?.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold">Admin Panel</h2>
      </div>
      <nav className="mt-6">
        <SidebarLink href="/admin">Dashboard</SidebarLink>
        <SidebarLink href="/admin/products">Products</SidebarLink>
        <SidebarLink href="/admin/orders">Orders</SidebarLink>
        <SidebarLink href="/admin/users">Users</SidebarLink>
      </nav>
    </aside>
  )
}

function SidebarLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="block px-6 py-3 text-gray-700 hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-500"
    >
      {children}
    </a>
  )
}