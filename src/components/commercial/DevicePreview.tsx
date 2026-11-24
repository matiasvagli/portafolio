import { LockKeyhole } from "lucide-react";
import type { ReactNode } from "react";

export default function DevicePreview({ children, address }: { children: ReactNode; address: string }) {
  return (
    <div className="device-preview">
      <div className="device-chrome">
        <span className="device-controls" aria-hidden="true"><i /><i /><i /></span>
        <span className="device-address"><LockKeyhole size={12} aria-hidden="true" />{address}</span>
      </div>
      <div className="device-screen">{children}</div>
    </div>
  );
}
