"use client";

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // need to install uuid

export function useAuth() {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem('signal_device_id');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('signal_device_id', id);
    }
    setDeviceId(id);
  }, []);

  return { deviceId };
}
