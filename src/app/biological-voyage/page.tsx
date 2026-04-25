import type { Metadata } from 'next';
import BiologicalVoyage from '@/components/BiologicalVoyage';

export const metadata: Metadata = {
  title: 'Biological Voyage | Volumetric MRI Explorer',
  description:
    'Navigate an infinite Z-axis tunnel of volumetric MRI slices and cellular frames. A medical-grade immersive experience with velocity-based chromatic aberration and inertial momentum.',
};

export default function BiologicalVoyagePage() {
  return <BiologicalVoyage />;
}
