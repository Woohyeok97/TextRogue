import Image from 'next/image';
import Link from 'next/link';
// components
import { Spacing } from '@/components/shared/Spacing';
// remotes
import { getScenarioById } from '@/remotes/server/scenario';

interface ScenarioDetailProps {
  params: { id: string };
}
export default async function ScenarioDetail({ params }: ScenarioDetailProps) {
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
            <Link href={`/scenario/${scenario._id}/play`}>
              <button className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                Play
              </button>
            </Link>
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
              {scenario.background}
            </Link>
          </div>
          <Spacing />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{scenario.prologue}</p>
          <Spacing />
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{scenario.description}</p>
        </div>
      </div>
    </main>
  );
}
