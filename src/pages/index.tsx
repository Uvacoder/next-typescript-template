import Card from '@/components/Card';
import { GetServerSideProps, NextPage } from 'next';
interface Props {
  launch: {
    mission: string;
    site: string;
    timestamp: number;
    rocket: string;
  };
}

const IndexPage: NextPage<Props> = ({ launch }) => {
  return (
    <div className="container flex justify-center mx-auto align-middle">
      <Card data={launch} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const response = await fetch('https://api.spacexdata.com/v3/launches/next');
  const nextLaunch = await response.json();

  return {
    props: {
      launch: {
        mission: nextLaunch.mission_name,
        site: nextLaunch.launch_site.site_name_long,
        timestamp: nextLaunch.launch_date_unix * 1000,
        rocket: nextLaunch.rocket.rocket_name,
      },
    },
  };
};

export default IndexPage;
