import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import db from '@/db/db';

type DashboardCardProps = {
	title: string;
	subtitle: string;
	description: string;
};

function DashboardCard({ title, subtitle, description }: DashboardCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{subtitle}</CardDescription>
			</CardHeader>

			<CardContent>
				<p>{description}</p>
			</CardContent>
		</Card>
	);
}

async function getSalesData() {
	const data = await db.order.aggregate({
		_sum: { pricePaidInCents: true },
		_count: true,
	});

	return {
		amount: (data._sum.pricePaidInCents || 0) / 100,
		numberOfSales: data._count,
	};
}

export default async function AdminDashboard() {
	const salesData = await getSalesData();

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
			<DashboardCard
				title='Test'
				subtitle={salesData.numberOfSales}
				description={salesData.amount}
			/>
			<DashboardCard
				title='Test'
				subtitle='subtitle test'
				description='description'
			/>
			<DashboardCard
				title='Test'
				subtitle='subtitle test'
				description='description'
			/>
		</div>
	);
}
