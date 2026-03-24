"use client";

import { useEffect, useState } from 'react';

export function useAuth() {
  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    let id = localStorage.getItem('stik_device_id');
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem('stik_device_id', id);
    }
    setDeviceId(id);
  }, []);

  return { deviceId };
}
