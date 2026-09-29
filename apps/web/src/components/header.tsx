// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";

// export default function Header() {
//   const [isLogoHovered, setIsLogoHovered] = useState(false);
//   const [activeLink, setActiveLink] = useState("");

//   const linkClass = (linkName: string) =>
//     `px-6 py-3 relative overflow-hidden rounded-xl text-white font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-2xl ${
//       activeLink === linkName
//         ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg shadow-yellow-500/50"
//         : "bg-gradient-to-r from-black/30 to-black/10 hover:from-black/50 hover:to-black/30"
//     }`;

//   return (
//     <header className="flex h-24 w-full items-center justify-between bg-gradient-to-r from-[#4f5bd5] via-[#8692f7] to-[#4f5bd5] px-10 shadow-2xl shadow-black/40">
      
//       {/* Logo с 3D эффектом */}
//       <div
//         className="flex items-center gap-4 cursor-pointer"
//         onMouseEnter={() => setIsLogoHovered(true)}
//         onMouseLeave={() => setIsLogoHovered(false)}
//       >
//         {/* 3D контейнер для лого */}
//         <div className="relative">
//           {/* 3D тень */}
//           <div
//             className={`absolute inset-0 bg-gradient-to-br from-purple-600/40 to-blue-500/40 blur-xl transition-all duration-700 ${
//               isLogoHovered ? "opacity-100 scale-125" : "opacity-50 scale-100"
//             }`}
//           ></div>
          
//           {/* Основной 3D блок */}
//           <div
//             className={`relative h-20 w-20 rounded-2xl bg-gradient-to-br from-white via-gray-100 to-gray-200 shadow-2xl transition-all duration-700 ${
//               isLogoHovered
//                 ? "transform-gpu rotate-y-12 rotate-x-6 scale-110 shadow-purple-500/50"
//                 : "shadow-black/30"
//             }`}
//             style={{
//               transformStyle: "preserve-3d",
//             }}
//           >
//             {/* Боковая грань (3D эффект) */}
//             <div
//               className={`absolute -right-2 top-1/2 h-16 w-4 -translate-y-1/2 rounded-lg bg-gradient-to-r from-gray-300 to-gray-400 transition-all duration-700 ${
//                 isLogoHovered ? "opacity-100" : "opacity-0"
//               }`}
//               style={{
//                 transform: "rotateY(90deg) translateZ(38px)",
//               }}
//             ></div>
            
//             {/* Нижняя грань */}
//             <div
//               className={`absolute bottom-0 left-1/2 h-4 w-16 -translate-x-1/2 translate-y-2 rounded-lg bg-gradient-to-b from-gray-400 to-gray-500 transition-all duration-700 ${
//                 isLogoHovered ? "opacity-100" : "opacity-0"
//               }`}
//               style={{
//                 transform: "rotateX(90deg) translateZ(38px)",
//               }}
//             ></div>

//             {/* Логотип с параллакс эффектом */}
//             <div
//               className={`absolute inset-0 flex items-center justify-center transition-transform duration-700 ${
//                 isLogoHovered
//                   ? "transform-gpu -translate-z-4"
//                   : "transform-gpu translate-z-0"
//               }`}
//             >
//               <Image
//                 src="/headerb.png"
//                 alt="Proglab Logo"
//                 width={48}
//                 height={48}
//                 className={`object-contain transition-all duration-700 ${
//                   isLogoHovered
//                     ? "brightness-110 contrast-125 drop-shadow-lg"
//                     : "drop-shadow-md"
//                 }`}
//                 priority
//               />
//             </div>

//             {/* Отражения */}
//             <div
//               className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent transition-opacity duration-500 ${
//                 isLogoHovered ? "opacity-100" : "opacity-0"
//               }`}
//             ></div>
//           </div>
//         </div>

//         {/* Название с анимированным текстом */}
//         <div className="relative">
//           <div className="overflow-hidden">
//             <h1
//               className={`text-3xl font-black bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent transition-all duration-700 ${
//                 isLogoHovered
//                   ? "translate-y-0 opacity-100"
//                   : "translate-y-full opacity-0"
//               }`}
//             >
//               PROGLAB
//             </h1>
//             <h1
//               className={`text-3xl font-black text-white transition-all duration-700 absolute top-0 ${
//                 isLogoHovered
//                   ? "-translate-y-full opacity-0"
//                   : "translate-y-0 opacity-100"
//               }`}
//             >
//               Proglab
//             </h1>
//           </div>
          
//           <div
//             className={`h-1 bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-700 ${
//               isLogoHovered ? "w-full scale-x-100" : "w-0 scale-x-0"
//             }`}
//           ></div>
          
//           <p
//             className={`text-sm text-white/80 font-medium mt-1 transition-all duration-700 delay-300 ${
//               isLogoHovered
//                 ? "translate-y-0 opacity-100"
//                 : "translate-y-4 opacity-0"
//             }`}
//           >
//             INNOVATION • CODE • DESIGN
//           </p>
//         </div>
//       </div>

//       {/* Навигация с 3D эффектами */}
//       <nav className="flex items-center gap-3">
//         {["Home", "Lab3", "Login", "Logout"].map((item) => (
//           <Link
//             key={item}
//             href={item === "Home" ? "/" : "#"}
//             className={linkClass(item)}
//             onMouseEnter={() => setActiveLink(item)}
//             onMouseLeave={() => setActiveLink("")}
//             onClick={() => setActiveLink(item)}
//           >
//             {/* 3D эффект кнопки */}
//             <div className="relative">
//               <span className="relative z-10 flex items-center gap-2">
//                 {item === "Home" && "🏠"}
//                 {item === "Lab3" && "🔬"}
//                 {item === "Login" && "🔑"}
//                 {item === "Logout" && "🚪"}
//                 {item}
//               </span>
              
//               {/* Подсветка при наведении */}
//               <div
//                 className={`absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 rounded-xl transition-all duration-500 ${
//                   activeLink === item
//                     ? "opacity-100 blur-md"
//                     : "opacity-0 blur-0"
//                 }`}
//               ></div>
              
//               {/* Блеск */}
//               <div
//                 className={`absolute -inset-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl transition-all duration-700 ${
//                   activeLink === item
//                     ? "opacity-100 animate-shine"
//                     : "opacity-0"
//                 }`}
//               ></div>
//             </div>
//           </Link>
//         ))}
//       </nav>
//     </header>
//   );
// }

// "use client";

// import Link from "next/link";
// import Image from "next/image";

// export default function Header() {
//   const linkClass =
//     "px-4 py-2.5 rounded-lg text-white font-medium hover:bg-black/90 hover:text-yellow-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/30";

//   return (
//     <header className="flex h-20 w-full items-center justify-between bg-gradient-to-r from-[#8692f7] via-[#6b7af0] to-[#8692f7] px-8 shadow-lg shadow-black/20 backdrop-blur-sm">
      
//       {/* Logo - улучшенная версия */}
//       <div className="flex items-center gap-4 cursor-pointer group">
//         {/* Анимированный контейнер для лого */}
//         <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-2xl shadow-black/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-amber-200/40 group-hover:shadow-2xl">
          
//           {/* Внешняя подсветка */}
//           <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-300/30 to-yellow-400/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
//           {/* Внутренний контур */}
//           <div className="absolute inset-0 rounded-2xl border-2 border-white/50"></div>
          
//           {/* Логотип с улучшенной анимацией */}
//           <div className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
//             <Image
//               src="/headerb.png"
//               alt="Proglab Logo"
//               width={36}
//               height={36}
//               className="object-contain drop-shadow-md"
//               priority
//             />
//           </div>

//           {/* Микровспышка при наведении */}
//           <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-yellow-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//         </div>

//         {/* Название с улучшенной типографикой */}
//         <div className="flex flex-col">
//           <span className="text-2xl font-bold text-white tracking-tight transition-all duration-500 group-hover:text-yellow-300 group-hover:drop-shadow-lg">
//             Proglab
//           </span>
//         </div>

//         {/* Декоративная линия */}
//         <div className="ml-4 h-8 w-0.5 bg-gradient-to-b from-transparent via-white/50 to-transparent group-hover:via-yellow-300 transition-all duration-500"></div>
//       </div>

//       {/* Навигация с улучшенными стилями */}
//       <nav className="flex items-center gap-3">
//         <Link href="/" className={linkClass}>
//           <span className="flex items-center gap-2">
//             Home
//           </span>
//         </Link>
//         <Link href="/labs" className={linkClass}>
//           <span className="flex items-center gap-2">
//              Labs
//           </span>
//         </Link>
//         <Link href="/weather" className={linkClass}>
//           <span className="flex items-center gap-2">
//              Weather
//           </span>
//         </Link>
//         <Link href="/Login" className={`${linkClass} bg-black/20 hover:bg-green-600/90`}>
//           <span className="flex items-center gap-2">
//             LogIn
//           </span>
//         </Link>
//         <Link href="/Logout" className={`${linkClass} bg-red-500/20 hover:bg-red-600/90`}>
//           <span className="flex items-center gap-2">
//              Logout
//           </span>
//         </Link>
//       </nav>
//     </header>
//   );
// }


// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState, useEffect, useRef } from "react";
// import { ChevronDown } from "lucide-react";

// export default function Header() {
//   const [labsOpen, setLabsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // Закрытие dropdown при клике вне области
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setLabsOpen(false);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const linkClass =
//     "px-4 py-2.5 rounded-lg text-white font-medium hover:bg-black/90 hover:text-yellow-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/30";
  
//   const dropdownItemClass = "block w-full text-left px-4 py-2.5 hover:bg-[#6b32a0] hover:text-white transition-all duration-200 text-sm";

//   return (
//     <header className="flex h-20 w-full items-center justify-between bg-gradient-to-r from-[#8692f7] via-[#6b7af0] to-[#8692f7] px-8 shadow-lg shadow-black/20 backdrop-blur-sm">
      
//       {/* Logo */}
//       <div className="flex items-center gap-4 cursor-pointer group">
//         <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-gray-100 shadow-2xl shadow-black/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-amber-200/40 group-hover:shadow-2xl">
//           <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-300/30 to-yellow-400/30 blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//           <div className="absolute inset-0 rounded-2xl border-2 border-white/50"></div>
//           <div className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
//             <Image
//               src="/headerb.png"
//               alt="Proglab Logo"
//               width={36}
//               height={36}
//               className="object-contain drop-shadow-md"
//               priority
//             />
//           </div>
//           <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-yellow-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
//         </div>

//         <div className="flex flex-col">
//           <span className="text-2xl font-bold text-white tracking-tight transition-all duration-500 group-hover:text-yellow-300 group-hover:drop-shadow-lg">
//             Proglab
//           </span>
//         </div>

//         <div className="ml-4 h-8 w-0.5 bg-gradient-to-b from-transparent via-white/50 to-transparent group-hover:via-yellow-300 transition-all duration-500"></div>
//       </div>

//       {/* Навигация */}
//       <nav className="flex items-center gap-3">
//         <Link href="/" className={linkClass}>
//           <span className="flex items-center gap-2">Home</span>
//         </Link>

//         {/* Dropdown для лабораторных работ */}
//         <div className="relative" ref={dropdownRef}>
//           <button
//             onClick={() => setLabsOpen(!labsOpen)}
//             className={`${linkClass} flex items-center gap-1`}
//           >
//             Labs <ChevronDown size={16} className={`transition-transform duration-300 ${labsOpen ? 'rotate-180' : ''}`} />
//           </button>

//           {/* Выпадающее меню */}
//           {labsOpen && (
//             <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
//               <ul className="py-1">
//                 <li>
//                   <Link href="/labs/lab3_4" className={`${dropdownItemClass} text-gray-800 font-semibold bg-purple-50`}>
//                     Frontend #3-4 (Zustand) ⭐
//                   </Link>
//                 </li>
//                 <li className="border-t border-gray-100 my-1"></li>
//                 <li>
//                   <Link href="/labs/backend3" className={`${dropdownItemClass} text-gray-800`}>
//                     Backend #3 (Modules)
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/labs/backend4" className={`${dropdownItemClass} text-gray-800`}>
//                     Backend #4 (Middleware)
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           )}
//         </div>

//         <Link href="/weather" className={linkClass}>
//           <span className="flex items-center gap-2">Weather</span>
//         </Link>

//         <Link href="/Login" className={`${linkClass} bg-black/20 hover:bg-green-600/90`}>
//           <span className="flex items-center gap-2">LogIn</span>
//         </Link>

//         <Link href="/Logout" className={`${linkClass} bg-red-500/20 hover:bg-red-600/90`}>
//           <span className="flex items-center gap-2">Logout</span>
//         </Link>
//       </nav>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Palette } from "lucide-react";

export default function Header() {
  const [labsOpen, setLabsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLabsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass =
    "px-4 py-2.5 rounded-lg text-white font-medium hover:bg-black/90 hover:text-yellow-300 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/30";

  const dropdownItemClass =
    "block w-full text-left px-4 py-2.5 hover:bg-[#6b32a0] hover:text-white transition-all duration-200 text-sm";

  return (
    <header 
      className={`flex h-20 w-full items-center justify-between px-8 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-500 sticky top-0 z-[100]`}
    >
      {/* Logo */}
      <div className="flex items-center gap-4 cursor-pointer group">
        <span className="text-2xl font-bold text-white group-hover:text-yellow-300 transition">
          agro-analytics-platform
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-3">

        <Link href="/" className={linkClass}>Home</Link>

        <Link href="../components/NDVIMap" className={linkClass}>
          карта
        </Link>

        <Link href="/map" className="p-2 hover:bg-black rounded text-white hover:text-yellow-300">
          Map
        </Link>

        <Link href="/supply-chain" className={`${linkClass} bg-black/20 hover:bg-green-600`}>
          Supply-Chain
        </Link>
      </nav>
    </header>
  );
}