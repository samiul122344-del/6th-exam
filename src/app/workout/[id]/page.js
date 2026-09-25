import WorkoutDetails from './WorkoutDetails';

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
  ];
}

export default function Page({ params }) {
  return <WorkoutDetails params={params} />;
}