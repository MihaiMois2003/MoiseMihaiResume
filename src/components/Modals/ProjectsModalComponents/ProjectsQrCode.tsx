import React from "react";
import { QrCode } from "lucide-react";

interface ProjectQRCodeProps {
  qrCode: string;
}

export const ProjectQRCode: React.FC<ProjectQRCodeProps> = ({ qrCode }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <QrCode size={20} className="text-blue-400" />
        <h4 className="text-lg font-semibold text-white">Scan to Try</h4>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <img src={qrCode} alt="QR Code" className="w-full h-auto" />
      </div>
      <p className="text-gray-400 text-xs text-center mt-2">
        Scan with your phone to try the app
      </p>
    </div>
  );
};
