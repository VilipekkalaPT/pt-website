import { PACKAGE_TYPE, PACKAGE_TYPE_NAMES } from "app/utils/variables";
import cn from "classnames";

interface FilterProps {
  tabs: PACKAGE_TYPE[];
  activeTab: string;
  handleTabChange: (tab: PACKAGE_TYPE) => void;
}

export default function Filter({
  tabs,
  activeTab,
  handleTabChange,
}: FilterProps) {
  return (
    <div className="flex justify-between items-center my-12">
      {tabs.map((tab) => {
        return (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={cn(
              "w-full cursor-pointer border-b border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-700",
              {
                "border-gray-700": activeTab === tab,
              }
            )}
          >
            {PACKAGE_TYPE_NAMES[tab] || tab}
          </button>
        );
      })}
    </div>
  );
}
