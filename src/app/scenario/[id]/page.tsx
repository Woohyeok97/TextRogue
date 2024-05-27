import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
// components
import { Spacing } from '@/components/shared/Spacing';
import ScenarioPlay from '@/components/shared/ScenarioPlay';
// remotes
import { getScenarioById } from '@/remotes/mongodb/server/scenario';

interface ScenarioDetailProps {
  params: { id: string };
}
export default async function ScenarioDetail({ params }: ScenarioDetailProps) {
  const session = await getServerSession(authOptions);
  const scenario = await getScenarioById(params.id);

  return (
    <main>
      <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Image
          width={100}
          height={100}
          sizes="100%"
          className="object-cover w-full h-64"
          src="/기본배경.jpeg"
          alt="Article"
        />
        <div className="p-6">
          <p className="font-bold mb-3 text-gray-700 cursor-pointer dark:text-gray-200">고나우</p>
          <div className="flex justify-between">
            <h1 className="block text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline">
              {scenario.title}
            </h1>
            <ScenarioPlay scenario={scenario} userId={session?.user.id} />
          </div>
          <div className="flex gap-3">
            <Link
              href="#"
              className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
            >
              {scenario.genre}
            </Link>
            <Link
              href="#"
              className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
            >
              {scenario.world}
            </Link>
          </div>
          <Spacing />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{scenario.prologue.text}</p>
          <Spacing />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{scenario.description}</p>
        </div>
      </div>
    </main>
  );
}
