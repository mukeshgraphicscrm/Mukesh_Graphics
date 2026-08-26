import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle2, Pause, Play } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox } from '@react-three/drei';

// --- 3D Box Component ---
function BoxPreview({ dimensions, isRotating }) {
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

  return (
    <group>
      <RoundedBox
        ref={boxRef}
        args={[w, h, d]}
        radius={0.05}
        smoothness={4}
        position={[0, h / 2 - 0.5, 0]}
      >
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
      </RoundedBox>
      <ContactShadows position={[0, -0.6, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      <Environment preset="city" />
    </group>
  );
}

const Customize = () => {
  // State for form selections
  const [dimensions, setDimensions] = useState({ length: 120, width: 80, height: 60, unit: 'MM' });
  const [packagingType, setPackagingType] = useState('Ice Cream Box');
  const [boxStructure, setBoxStructure] = useState('Straight Tuck End');
  const [material, setMaterial] = useState('SBS Board');
  const [printing, setPrinting] = useState('5 Color Offset');
  const [finishing, setFinishing] = useState('Matt Lamination');

  // State for 3D interactions
  const [isRotating, setIsRotating] = useState(true);

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
    <div className="relative min-h-screen bg-gradient-to-r from-[#FFD1A6] via-[#FFFDF9] to-[#FFCE9E] pt-28 pb-20 overflow-hidden">
      
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

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left Column - Form Steps */}
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
                    onClick={() => setPackagingType(type)}
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
                <select
                  value={boxStructure}
                  onChange={(e) => setBoxStructure(e.target.value)}
                  className="w-full appearance-none px-5 py-4 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-[#1F1916] font-bold bg-white transition-all cursor-pointer"
                >
                  {boxStructures.map(structure => (
                    <option key={structure} value={structure}>{structure}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-[#1F1916] font-bold transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Width</label>
                  <input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => setDimensions({ ...dimensions, width: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-[#1F1916] font-bold transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Height</label>
                  <input
                    type="number"
                    value={dimensions.height}
                    onChange={(e) => setDimensions({ ...dimensions, height: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-[#1F1916] font-bold transition-all"
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

              <div className="border-2 border-dashed border-[#FF7B3B]/30 hover:border-[#FF7B3B] bg-white rounded-[1.5rem] p-10 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-orange-50/30 transition-all group">
                <div className="bg-orange-100 p-3 rounded-full text-[#FF7B3B] mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <UploadCloud size={24} />
                </div>
                <div className="font-bold text-[#1F1916] mb-1">Drag & drop or browse</div>
                <div className="text-xs text-gray-500">PDF, AI, PSD, PNG, JPEG up to 20MB</div>
              </div>
              <p className="text-[11px] text-gray-500 mt-4 leading-relaxed">
                Images apply live on the 3D preview. PDF / AI / PSD are received with your quote request.
              </p>
            </motion.div>

          </div>

          {/* Right Column - 3D Preview & Form */}
          <div className="w-full lg:w-[55%] flex flex-col gap-6">

            {/* Sticky 3D Preview Container */}
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-[#4A0B0B] to-[#1A0303] rounded-[2.5rem] w-full aspect-[4/3] md:aspect-[16/10] relative overflow-hidden shadow-[0_20px_40px_rgba(74,11,11,0.2)]"
              >
                {/* 3D Canvas */}
                <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[10, 10, 5]} intensity={1} />
                  <BoxPreview dimensions={dimensions} isRotating={isRotating} />
                  <OrbitControls enableZoom={true} enablePan={false} />
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

              {/* Step 09: Instant Estimate Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Step 09 · Instant Estimate</div>
                    <h2 className="text-2xl font-bold text-[#1F1916]">Send your specification</h2>
                  </div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:block">
                    REF · MG-OK77UV
                  </div>
                </div>

                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-sm font-medium transition-all bg-gray-50/50" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Company</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-sm font-medium transition-all bg-gray-50/50" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Phone</label>
                      <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-sm font-medium transition-all bg-gray-50/50" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                      <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-sm font-medium transition-all bg-gray-50/50" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Quantity</label>
                      <input type="number" defaultValue={5000} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-sm font-bold transition-all bg-gray-50/50" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Delivery Location</label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-sm font-medium transition-all bg-gray-50/50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Notes</label>
                    <textarea
                      placeholder="Anything else we should know — special inks, certifications, deadlines."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#FF7B3B] focus:ring-1 focus:ring-[#FF7B3B] outline-none text-sm font-medium transition-all resize-none bg-gray-50/50"
                    />
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button type="submit" className="flex-1 bg-gradient-to-r from-[#FF954B] to-[#FF6B2B] hover:from-[#FFA25B] hover:to-[#FF7B3B] text-white py-4 px-6 rounded-full font-bold transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2">
                      Send for instant estimate &rarr;
                    </button>
                    <button type="button" className="sm:w-auto w-full bg-white text-[#1F1916] border border-gray-200 py-4 px-8 rounded-full font-bold hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm">
                      Download spec
                    </button>
                  </div>

                  <p className="text-[10px] text-gray-400 mt-4 leading-relaxed">
                    By submitting you agree to be contacted about your packaging request. We never share your details. Prefer to email us instead?
                  </p>
                </form>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Customize;
