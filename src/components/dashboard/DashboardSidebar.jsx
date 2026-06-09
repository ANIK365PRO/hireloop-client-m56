
import {Bars, Bell,Briefcase, Envelope, Gear, House, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
  const navItems = [
    {icon: House, href: "/dashboard/recruiter", label: "Home"},
    {icon: Magnifier, href: "/dashboard/recruiter/jobs", label: "Jobs"},
    {icon: Bell, href: "/dashboard/recruiter/jobs/new", label: "Post a Job"},
    {icon: Briefcase, href: "/dashboard/recruiter/company", label: "Company Profile"},
    {icon: Envelope, href: "/dashboard/recruiter/messages", label: "Messages"},
    {icon: Person, href: "/dashboard/recruiter/profile", label: "Profile"},
    {icon: Gear, href: "/dashboard/recruiter/settings", label: "Settings"},
  ];

  const navContent = <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    type="button"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>


  return (
    <>

        {/* for lg device sidebar  */}
        <aside className="hidden w-64 lg:block border-r shrink-0 border-default p-4">{navContent}</aside>

        {/* for sm to md device drawer  */}
        <Drawer>
            <Button size="sm" className="lg:hidden rounded-none" variant="secondary">
                <Bars />
                Sidebar
            </Button>
            <Drawer.Backdrop>
                <Drawer.Content placement="left">
                <Drawer.Dialog>
                    <Drawer.CloseTrigger />
                    <Drawer.Header>
                    <Drawer.Heading>Navigation</Drawer.Heading>
                    </Drawer.Header>
                    <Drawer.Body>
                    
                        {navContent}

                    </Drawer.Body>
                </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    
    </>
  );
}