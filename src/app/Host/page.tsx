import BookingRequestsQueue from "@/components/BookingRequestsQueue";
import BookingTabs from "@/components/BookingTabs";
import HostSidebar from "@/components/HostSidebar";
import HostSpotsPage from "@/components/HostSpotsPage";
import HostStatCards from "@/components/HostStatCards";
import EarningsCard from "@/components/EarningsCard";
import ReviewsGrid from "@/components/ReviewsGrid";

export default function HostDashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <HostSidebar />

      {/* Main content */}
      <main className="flex flex-col overflow-y-auto p-6 space-y-6 bg-muted/50 h-[100dvh]  ">
        <HostStatCards />
        {/* other dashboard widgets here */}
        <HostSpotsPage />
        <BookingRequestsQueue />
        <BookingTabs />
        <h1 className="text-2xl font-bold mb-4">Earnings</h1>
        <EarningsCard />
        <h1 className="text-2xl font-bold mb-6">Reviews</h1>
        <ReviewsGrid />
      </main>
    </div>
  );
}