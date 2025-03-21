
import { MenuProvider } from "./MenuContext";
import { MenuList } from "./MenuList";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MenuStats } from "./MenuStats";

export const MenuManagementPage = () => {
  return (
    <div className="flex h-screen bg-gray-800 text-white">
      <Sidebar activeTab="menu" setActiveTab={() => {}} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header title="Menu Management" />
        
        <div className="flex-1 overflow-auto p-6">
          <MenuProvider>
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-gray-700 rounded-lg shadow-lg p-6 text-center">
                <h1 className="text-4xl font-bold text-yellow-400 mb-2">MISTER CHOMA</h1>
                <h2 className="text-xl text-white mb-6">NAMANGA DSM</h2>
                <p className="text-green-400">Menu items imported from Mister Choma restaurant</p>
              </div>
              <MenuStats />
              <MenuList />
            </div>
          </MenuProvider>
        </div>
      </div>
    </div>
  );
};
