import Link from 'next/link';
// type
import { ScenarioType } from '@/models';

interface ScenarioItemProps {
  scenario: ScenarioType;
}
export default function ScenarioItem({ scenario }: ScenarioItemProps) {
  return (
    <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="mt-2">
        <Link
          href={`/scenario/${scenario._id}`}
          className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline"
        >
          {scenario.title}
        </Link>
        <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">{scenario.prologue.text}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
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

        <div className="flex items-center">
          <p className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">고나우</p>
        </div>
      </div>
    </div>
  );
}
