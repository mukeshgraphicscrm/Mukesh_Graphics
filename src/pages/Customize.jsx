import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { UploadCloud, CheckCircle2, Pause, Play, ChevronDown, AlertCircle } from 'lucide-react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox, Bounds } from '@react-three/drei';

const materialProperties = {
  'Duplex Board': { color: '#F0F0F0', roughness: 0.5 },
  'Kraft Paper': { color: '#C19A6B', roughness: 0.9 },
  'Rigid Board': { color: '#FAFAFA', roughness: 0.1 },
  'SBS Board': { color: '#FFFFFF', roughness: 0.2 },
  'Corrugated': { color: '#A67B5B', roughness: 0.9 },
  'Eco-friendly': { color: '#E0D8C8', roughness: 0.8 }
};

const finishingProperties = {
  'Gloss Lamination': { roughness: 0.05, metalness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.1 },
  'Matt Lamination': { roughness: 0.85, metalness: 0.0, clearcoat: 0.0, clearcoatRoughness: 0.0 },
  'Spot UV': { roughness: 0.4, metalness: 0.2, clearcoat: 0.6, clearcoatRoughness: 0.2 },
  'Gold Foiling': { roughness: 0.2, metalness: 0.7, clearcoat: 0.3, clearcoatRoughness: 0.2 },
  'Soft Touch': { roughness: 1.0, metalness: 0.0, clearcoat: 0.0, clearcoatRoughness: 0.0 },
};

// --- Texture Component ---
function BoxTextureMaterial({ artworkUrl, baseColor, finishProps }) {
  const texture = useLoader(THREE.TextureLoader, artworkUrl);
  
  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [texture]);

  return <meshPhysicalMaterial color={baseColor} map={texture} side={THREE.DoubleSide} {...finishProps} />;
}

// --- 3D Box Component ---
function BoxPreview({ dimensions, isRotating, artworkUrl, boxStructure, material, finishing }) {
  const boxRef = useRef();

  useFrame((state, delta) => {
    if (isRotating && boxRef.current) {
      boxRef.current.rotation.y += delta * 0.5;
    }
  });

  // Scale down dimensions for 3D view so it fits reasonably
  const scaleFactor = 0.025;
  const w = Math.max(dimensions.length || 10, 1) * scaleFactor;
  const h = Math.max(dimensions.height || 10, 1) * scaleFactor;
  const d = Math.max(dimensions.width || 10, 1) * scaleFactor;

  const openAngle = Math.PI / 2 - 0.25; // slightly open to show structure
  const closedAngle = Math.PI / 2;

  const matProps = materialProperties[material] || materialProperties['SBS Board'];
  const baseFinProps = finishingProperties[finishing] || finishingProperties['Matt Lamination'];
  
  // Combine material roughness with finishing properties
  const finishProps = {
    ...baseFinProps,
    // If it's a rough material like kraft paper, it resists becoming perfectly glossy
    roughness: Math.max(baseFinProps.roughness, matProps.roughness * 0.3) 
  };

  // Render a single panel (plane)
  const Panel = ({ width, height, pos, rot }) => (
    <mesh position={pos} rotation={rot}>
      <planeGeometry args={[width, height]} />
      {artworkUrl ? (
        <React.Suspense fallback={<meshPhysicalMaterial color={matProps.color} side={THREE.DoubleSide} {...finishProps} />}>
          <BoxTextureMaterial artworkUrl={artworkUrl} baseColor={matProps.color} finishProps={finishProps} />
        </React.Suspense>
      ) : (
        <meshPhysicalMaterial color={matProps.color} side={THREE.DoubleSide} {...finishProps} />
      )}
    </mesh>
  );

  // Top flap (folds forward from back panel)
  const TopFlap = ({ width, depth, height, angle }) => (
    <group position={[0, height / 2, -depth / 2]} rotation={[angle, 0, 0]}>
      <Panel width={width} height={depth} pos={[0, depth / 2, 0]} rot={[0, 0, 0]} />
    </group>
  );

  // Bottom flap (folds forward from back panel)
  const BottomFlapBack = ({ width, depth, height, angle, length }) => (
    <group position={[0, -height / 2, -depth / 2]} rotation={[-angle, 0, 0]}>
      <Panel width={width} height={length} pos={[0, -length / 2, 0]} rot={[0, 0, 0]} />
    </group>
  );

  // Bottom flap (folds backward from front panel)
  const BottomFlapFront = ({ width, depth, height, angle, length }) => (
    <group position={[0, -height / 2, depth / 2]} rotation={[angle, 0, 0]}>
      <Panel width={width} height={length} pos={[0, -length / 2, 0]} rot={[0, Math.PI, 0]} />
    </group>
  );

  // Side flaps (for snap lock)
  const BottomFlapSide = ({ width, depth, height, isRight, angle, length }) => (
    <group position={[isRight ? width / 2 : -width / 2, -height / 2, 0]} rotation={[0, isRight ? Math.PI / 2 : -Math.PI / 2, 0]}>
      <group rotation={[-angle, 0, 0]}>
        <Panel width={depth} height={length} pos={[0, -length / 2, 0]} rot={[0, 0, 0]} />
      </group>
    </group>
  );

  const renderStructure = () => {
    switch (boxStructure) {
      case 'Straight Tuck End':
        return (
          <>
            <TopFlap width={w} depth={d} height={h} angle={openAngle} />
            <BottomFlapBack width={w} depth={d} height={h} angle={openAngle} length={d} />
          </>
        );
      case 'Reverse Tuck End':
        return (
          <>
            <TopFlap width={w} depth={d} height={h} angle={openAngle} />
            <BottomFlapFront width={w} depth={d} height={h} angle={openAngle} length={d} />
          </>
        );
      case 'Snap Lock Bottom':
        return (
          <>
            <TopFlap width={w} depth={d} height={h} angle={openAngle} />
            {/* Snap lock has 4 interlocking bottom flaps overlapping each other */}
            <BottomFlapBack width={w} depth={d} height={h} angle={closedAngle - 0.05} length={d * 0.6} />
            <BottomFlapFront width={w} depth={d} height={h} angle={closedAngle - 0.08} length={d * 0.6} />
            <BottomFlapSide width={w} depth={d} height={h} isRight={false} angle={closedAngle - 0.1} length={w * 0.5} />
            <BottomFlapSide width={w} depth={d} height={h} isRight={true} angle={closedAngle - 0.12} length={w * 0.5} />
          </>
        );
      case 'Auto Bottom':
        return (
          <>
            <TopFlap width={w} depth={d} height={h} angle={openAngle} />
            {/* Auto bottom usually has 2 main overlapping panels glued */}
            <BottomFlapBack width={w} depth={d} height={h} angle={closedAngle - 0.05} length={d} />
            <BottomFlapFront width={w} depth={d} height={h} angle={closedAngle - 0.1} length={d} />
          </>
        );
      default:
        return (
          <>
            <TopFlap width={w} depth={d} height={h} angle={closedAngle} />
            <BottomFlapBack width={w} depth={d} height={h} angle={closedAngle} length={d} />
          </>
        );
    }
  };

  return (
    <group>
      <Bounds fit observe margin={1.5}>
        <group ref={boxRef}>
          {/* Main 4 body panels */}
          <Panel width={w} height={h} pos={[0, 0, d / 2]} rot={[0, 0, 0]} />
          <Panel width={w} height={h} pos={[0, 0, -d / 2]} rot={[0, Math.PI, 0]} />
          <Panel width={d} height={h} pos={[-w / 2, 0, 0]} rot={[0, -Math.PI / 2, 0]} />
          <Panel width={d} height={h} pos={[w / 2, 0, 0]} rot={[0, Math.PI / 2, 0]} />

          {/* Structural Flaps */}
          {renderStructure()}
        </group>
      </Bounds>
      <ContactShadows position={[0, -h / 2 - 0.01, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      <Environment preset="city" />
    </group>
  );
}

const packagingSpecs = {
  'Ice Cream Box': {
    structure: 'Straight Tuck End',
    dimensions: { length: 80, width: 80, height: 150, unit: 'MM' },
    material: 'Duplex Board',
    printing: 'Single Color',
    finishing: 'Matt Lamination'
  },
  'Medicine Box': {
    structure: 'Straight Tuck End',
    dimensions: { length: 50, width: 50, height: 120, unit: 'MM' },
    material: 'SBS Board',
    printing: '4 Color',
    finishing: 'Matt Lamination'
  },
  'Food Box': {
    structure: 'Auto Bottom',
    dimensions: { length: 150, width: 100, height: 60, unit: 'MM' },
    material: 'Kraft Paper',
    printing: 'Full CMYK',
    finishing: 'Matt Lamination'
  },
  'Masala Box': {
    structure: 'Straight Tuck End',
    dimensions: { length: 60, width: 40, height: 100, unit: 'MM' },
    material: 'Duplex Board',
    printing: '5 Color Offset',
    finishing: 'Gloss Lamination'
  },
  'Paper Bag': {
    structure: 'Auto Bottom',
    dimensions: { length: 200, width: 100, height: 250, unit: 'MM' },
    material: 'Kraft Paper',
    printing: '2 Color',
    finishing: 'Matt Lamination'
  },
  'Cone Sleeve': {
    structure: 'Snap Lock Bottom',
    dimensions: { length: 50, width: 50, height: 160, unit: 'MM' },
    material: 'Duplex Board',
    printing: 'Full CMYK',
    finishing: 'Gloss Lamination'
  },
  'Seed Box': {
    structure: 'Reverse Tuck End',
    dimensions: { length: 80, width: 20, height: 100, unit: 'MM' },
    material: 'Eco-friendly',
    printing: '4 Color',
    finishing: 'Matt Lamination'
  },
  'Custom Carton': {
    structure: 'Auto Bottom',
    dimensions: { length: 300, width: 200, height: 150, unit: 'MM' },
    material: 'Corrugated',
    printing: 'Single Color',
    finishing: 'Matt Lamination'
  }
};

const Customize = () => {
  // State for form selections - initialized with Ice Cream Box specs
  const [packagingType, setPackagingType] = useState('Ice Cream Box');
  const [dimensions, setDimensions] = useState(packagingSpecs['Ice Cream Box'].dimensions);
  const [boxStructure, setBoxStructure] = useState(packagingSpecs['Ice Cream Box'].structure);
  const [material, setMaterial] = useState(packagingSpecs['Ice Cream Box'].material);
  const [printing, setPrinting] = useState(packagingSpecs['Ice Cream Box'].printing);
  const [finishing, setFinishing] = useState(packagingSpecs['Ice Cream Box'].finishing);

  // State for 3D interactions
  const [isRotating, setIsRotating] = useState(true);
  const [isStructureOpen, setIsStructureOpen] = useState(false);
  const [artworkUrl, setArtworkUrl] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    phone: '',
    email: '',
    quantity: 5000,
    deliveryLocation: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let timer;
    if (success) {
      timer = setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [success]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const val = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, phone: val });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: null });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setArtworkUrl(url);
    }
  };

  const handleDownloadSpec = () => {
    const specData = `Packaging Specification - Mukesh Graphics
-----------------------------------------
Packaging Type: ${packagingType}
Box Structure: ${boxStructure}
Dimensions: ${dimensions.length}x${dimensions.width}x${dimensions.height} ${dimensions.unit}
Material: ${material}
Printing: ${printing}
Finishing: ${finishing}`;

    const blob = new Blob([specData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Mukesh_Graphics_Spec_${packagingType.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Must be exactly 10 digits';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'custom_package'), {
        ...formData,
        specifications: {
          packagingType,
          boxStructure,
          dimensions,
          material,
          printing,
          finishing
        },
        createdAt: serverTimestamp()
      });
      setSuccess(true);
      setFormData({
        fullName: '', company: '', phone: '', email: '', quantity: 5000, deliveryLocation: '', notes: ''
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Failed to submit estimate request.');
    }
    setIsSubmitting(false);
  };

  const handleTypeChange = (type) => {
    setPackagingType(type);
    setDimensions(packagingSpecs[type].dimensions);
    setBoxStructure(packagingSpecs[type].structure);
    setMaterial(packagingSpecs[type].material);
    setPrinting(packagingSpecs[type].printing);
    setFinishing(packagingSpecs[type].finishing);
  };

  // Form Data Options
  const packagingTypes = [
    'Ice Cream Box', 'Medicine Box', 'Food Box', 'Masala Box',
    'Paper Bag', 'Cone Sleeve', 'Seed Box', 'Custom Carton'
  ];

  const boxStructures = [
    'Straight Tuck End', 'Reverse Tuck End', 'Snap Lock Bottom', 'Auto Bottom'
  ];

  const materials = [
    { name: 'Duplex Board', desc: 'Versatile, cost-effective' },
    { name: 'SBS Board', desc: 'Premium white' },
    { name: 'Kraft Paper', desc: 'Natural, sustainable' },
    { name: 'Corrugated', desc: 'Transit-strength' },
    { name: 'Rigid Board', desc: 'Luxury feel' },
    { name: 'Eco-friendly', desc: 'Recycled fibres' },
  ];

  const printings = ['Single Color', '2 Color', '4 Color', '5 Color Offset', 'Full CMYK'];
  const finishings = ['Matt Lamination', 'Gloss Lamination', 'Spot UV', 'Gold Foiling', 'Soft Touch'];

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-[#FFD1A6] via-[#FFFDF9] to-[#FFCE9E] pt-28 pb-20">

      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(255,123,59,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,123,59,0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">

        {/* Hero Section */}
        <div className="mb-12 md:mb-16">
          <p className="text-[#FF7B3B] font-bold text-xs tracking-[0.15em] uppercase mb-4 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7B3B]" />
            LIVE 3D CUSTOMIZER
          </p>
          <h1 className="text-4xl md:text-[3.2rem] lg:text-[4.5rem] font-serif font-bold mb-6 leading-[1.05] tracking-tight text-[#1F1916]">
            Design your packaging<br />
            <span className="text-[#FF7B3B] font-normal italic relative">
              in real-time.
              <svg className="absolute w-[105%] h-[12px] -bottom-1 -left-2 text-[#FF7B3B]/40" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2.5" fill="none" /></svg>
            </span>
          </h1>
          <p className="text-[#554B45] text-base md:text-[17px] leading-[1.6] max-w-xl">
            Configure structure, dimensions, material and finish. Upload your artwork and inspect the box from every angle. When you're ready, send the full spec for an instant estimate.
          </p>
        </div>

        <div className="flex flex-col gap-8">

          {/* ROW 1: Steps 1-4 & 3D Preview */}
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">

            {/* Left Column A */}
            <div className="w-full lg:w-[45%] flex flex-col gap-6">

              {/* Step 01: Packaging type */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-gray-300">01</span>
                  <h2 className="text-xl font-bold text-[#1F1916]">Packaging type</h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {packagingTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => handleTypeChange(type)}
                      className={`px-5 py-3 rounded-full text-sm font-bold border text-center transition-all ${packagingType === type
                        ? 'bg-[#FF7B3B] text-white border-[#FF7B3B] shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#FF7B3B] hover:text-[#FF7B3B]'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Step 02: Box structure */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-gray-300">02</span>
                  <h2 className="text-xl font-bold text-[#1F1916]">Box structure</h2>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsStructureOpen(!isStructureOpen)}
                    className={`w-full flex items-center justify-between px-5 py-4 rounded-xl border outline-none text-[#1F1916] font-bold bg-white transition-all cursor-pointer ${isStructureOpen ? 'border-[#FF7B3B] ring-1 ring-[#FF7B3B]' : 'border-gray-200 hover:border-[#FF7B3B]'}`}
                  >
                    <span>{boxStructure}</span>
                    <ChevronDown size={20} className={`text-gray-500 transition-transform ${isStructureOpen ? 'rotate-180 text-[#FF7B3B]' : ''}`} />
                  </button>

                  {isStructureOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.05)] overflow-hidden z-30 flex flex-col">
                      {boxStructures.map(structure => (
                        <button
                          key={structure}
                          onClick={() => {
                            setBoxStructure(structure);
                            setIsStructureOpen(false);
                          }}
                          className={`px-5 py-4 text-left font-bold text-[15px] transition-colors ${boxStructure === structure ? 'bg-[#FF7B3B]/10 text-[#FF7B3B]' : 'text-gray-700 hover:bg-gray-50 hover:text-[#1F1916]'}`}
                        >
                          {structure}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Step 03: Dimensions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-gray-300">03</span>
                  <h2 className="text-xl font-bold text-[#1F1916]">Dimensions</h2>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Length</label>
                    <input
                      type="number"
                      value={dimensions.length}
                      onChange={(e) => setDimensions({ ...dimensions, length: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-[#1F1916] font-bold transition-all cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Width</label>
                    <input
                      type="number"
                      value={dimensions.width}
                      onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-[#1F1916] font-bold transition-all cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Height</label>
                    <input
                      type="number"
                      value={dimensions.height}
                      onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-[#1F1916] font-bold transition-all cursor-pointer"
                    />
                  </div>
                </div>

                <div className="inline-flex bg-gray-50 rounded-full p-1 border border-gray-100">
                  {['MM', 'CM', 'INCH'].map(unit => (
                    <button
                      key={unit}
                      onClick={() => setDimensions({ ...dimensions, unit })}
                      className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all ${dimensions.unit === unit
                        ? 'bg-[#FF7B3B] text-white shadow-md'
                        : 'text-gray-500 hover:text-[#FF7B3B]'
                        }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Step 04: Material */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-gray-300">04</span>
                  <h2 className="text-xl font-bold text-[#1F1916]">Material</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {materials.map(mat => (
                    <button
                      key={mat.name}
                      onClick={() => setMaterial(mat.name)}
                      className={`text-left p-4 rounded-xl border transition-all ${material === mat.name
                        ? 'border-[#FF7B3B] bg-orange-50/30 shadow-sm ring-1 ring-[#FF7B3B]'
                        : 'border-gray-200 hover:border-[#FF7B3B] hover:bg-gray-50/50'
                        }`}
                    >
                      <div className="font-bold text-[#1F1916] text-[15px]">{mat.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{mat.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Step 05: Printing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-gray-300">05</span>
                  <h2 className="text-xl font-bold text-[#1F1916]">Printing</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {printings.map(print => (
                    <button
                      key={print}
                      onClick={() => setPrinting(print)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${printing === print
                        ? 'bg-[#FF7B3B] text-white border-[#FF7B3B] shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#FF7B3B] hover:text-[#FF7B3B]'
                        }`}
                    >
                      {print}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Step 06: Finishing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-gray-300">06</span>
                  <h2 className="text-xl font-bold text-[#1F1916]">Finishing</h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {finishings.map(fin => (
                    <button
                      key={fin}
                      onClick={() => setFinishing(fin)}
                      className={`px-5 py-3 rounded-full text-sm font-bold border text-center transition-all ${finishing === fin
                        ? 'bg-[#FF7B3B] text-white border-[#FF7B3B] shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#FF7B3B] hover:text-[#FF7B3B]'
                        }`}
                    >
                      {fin}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Step 07: Upload Artwork */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-gray-300">07</span>
                  <h2 className="text-xl font-bold text-[#1F1916]">Upload artwork</h2>
                </div>

                <label className="border-2 border-dashed border-[#FF7B3B]/30 hover:border-[#FF7B3B] bg-white rounded-[1.5rem] p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50/30 transition-all group overflow-hidden relative">
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                  {artworkUrl ? (
                    <img src={artworkUrl} alt="Artwork" className="h-24 w-auto object-contain rounded-lg shadow-sm" />
                  ) : (
                    <>
                      <div className="bg-orange-100 p-3 rounded-full text-[#FF7B3B] mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                        <UploadCloud size={24} />
                      </div>
                      <div className="font-bold text-[#1F1916] mb-1">Drag & drop or browse</div>
                      <div className="text-xs text-gray-500">PNG, JPEG up to 20MB</div>
                    </>
                  )}
                </label>
              </motion.div>

            </div>

            {/* Right Column A - 3D Preview (Sticky until end of Row 1) */}
            <div className="w-full lg:w-[55%]">
              <div className="lg:sticky lg:top-28 flex flex-col gap-6 z-20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-[#4A0B0B] to-[#1A0303] rounded-[2.5rem] w-full aspect-[4/3] relative overflow-hidden shadow-[0_20px_40px_rgba(74,11,11,0.2)] flex-shrink-0"
                >
                  {/* 3D Canvas */}
                  <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />
                    <BoxPreview dimensions={dimensions} isRotating={isRotating} artworkUrl={artworkUrl} boxStructure={boxStructure} material={material} finishing={finishing} />
                    <OrbitControls makeDefault enableZoom={true} enablePan={false} />
                  </Canvas>

                  {/* Overlays */}
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <div className="bg-white/90 backdrop-blur-sm text-[#1F1916] text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider flex items-center gap-2 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      LIVE PREVIEW
                    </div>
                    <div className="bg-[#BFA15F] text-[#1F1916] text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wider shadow-sm hidden sm:block">
                      360° · ZOOM · INSPECT
                    </div>
                  </div>

                  <div className="absolute top-6 right-6">
                    <button
                      onClick={() => setIsRotating(!isRotating)}
                      className={`text-[#1F1916] text-[11px] font-bold px-4 py-1.5 rounded-full tracking-wide shadow-sm transition-colors ${isRotating ? 'bg-white hover:bg-gray-100' : 'bg-white/50 hover:bg-white/80'
                        }`}
                    >
                      Auto-rotate
                    </button>
                  </div>
                </motion.div>

                {/* Step 09: Instant Estimate Form (Grouped with 3D Preview) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Instant Estimate</div>
                      <h2 className="text-2xl font-bold text-[#1F1916]">Send your specification</h2>
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">
                      REF · MG-OK77UV
                    </div>
                  </div>

                  {success ? (
                    <div className="h-[400px] flex flex-col items-center justify-center text-center py-12">
                      <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={32} />
                      </div>
                      <h4 className="text-2xl font-bold mb-2">Request Received!</h4>
                      <p className="text-gray-500">Our team will get back to you within 24 hours.</p>
                      <button onClick={() => setSuccess(false)} className="mt-8 text-[#FF7B3B] font-medium">
                        Submit another request
                      </button>
                    </div>
                  ) : (
                  <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                        <input type="text" name="fullName" value={formData.fullName} onChange={handleFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-sm font-medium transition-all bg-gray-50/50 cursor-pointer" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Company</label>
                        <input type="text" name="company" value={formData.company} onChange={handleFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-sm font-medium transition-all bg-gray-50/50 cursor-pointer" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Phone</label>
                        <input type="tel" name="phone" maxLength="10" value={formData.phone} onChange={handleFormChange} required className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-[#FF4A4A] focus:ring-[#FF4A4A] bg-[#FF4A4A]/5' : 'border-gray-200 focus:border-[#FF7B3B] focus:ring-[#FF7B3B] bg-gray-50/50'} focus:ring-1 outline-none text-sm font-medium transition-all cursor-pointer`} />
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 8 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="text-[#FF4A4A] text-[10px] flex items-center gap-1.5 font-bold px-1 overflow-hidden">
                              <AlertCircle size={12} /> {errors.phone}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleFormChange} required className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-[#FF4A4A] focus:ring-[#FF4A4A] bg-[#FF4A4A]/5' : 'border-gray-200 focus:border-[#FF7B3B] focus:ring-[#FF7B3B] bg-gray-50/50'} focus:ring-1 outline-none text-sm font-medium transition-all cursor-pointer`} />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.div initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: 8 }} exit={{ opacity: 0, height: 0, marginTop: 0 }} className="text-[#FF4A4A] text-[10px] flex items-center gap-1.5 font-bold px-1 overflow-hidden">
                              <AlertCircle size={12} /> {errors.email}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Quantity</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-sm font-bold transition-all bg-gray-50/50 cursor-pointer" />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Delivery Location</label>
                        <input type="text" name="deliveryLocation" value={formData.deliveryLocation} onChange={handleFormChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-sm font-medium transition-all bg-gray-50/50 cursor-pointer" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleFormChange}
                        placeholder="Anything else we should know — special inks, certifications, deadlines."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-sm font-medium transition-all resize-none bg-gray-50/50 cursor-pointer"
                      />
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                      <button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-[#FF954B] to-[#FF6B2B] hover:from-[#FFA25B] hover:to-[#FF7B3B] text-white py-4 px-6 rounded-full font-bold transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 disabled:opacity-70">
                        {isSubmitting ? 'Sending...' : 'Send for instant estimate →'}
                      </button>
                      <button type="button" onClick={handleDownloadSpec} className="sm:w-auto w-full bg-white text-[#1F1916] border border-gray-200 py-4 px-8 rounded-full font-bold hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm">
                        Download spec
                      </button>
                    </div>

                    <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">
                      By submitting you agree to be contacted about your packaging request. We never share your details. Prefer to email us instead?
                    </p>
                  </form>
                  )}
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
