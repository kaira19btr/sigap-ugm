"use client";
import React, { useEffect, useRef, useState } from "react";
import { User, Lock, ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
import { GradientButton } from './gradient-button';

// Vertex shader source code
const vertexSmokeySource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

// Fragment shader source code for the smokey background effect
const fragmentSmokeySource = `
precision mediump float;

uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform vec3 u_color;

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 uv = fragCoord / iResolution;
    vec2 centeredUV = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);

    float time = iTime * 0.5;

    // Normalize mouse input (0.0 - 1.0) and remap to -1.0 ~ 1.0
    vec2 mouse = iMouse / iResolution;
    vec2 rippleCenter = 2.0 * mouse - 1.0;

    vec2 distortion = centeredUV;
    // Apply distortion for a wavy, smokey effect
    for (float i = 1.0; i < 8.0; i++) {
        distortion.x += 0.5 / i * cos(i * 2.0 * distortion.y + time + rippleCenter.x * 3.1415);
        distortion.y += 0.5 / i * cos(i * 2.0 * distortion.x + time + rippleCenter.y * 3.1415);
    }

    // Create a glowing wave pattern
    float wave = abs(sin(distortion.x + distortion.y + time));
    float glow = smoothstep(0.9, 0.2, wave);

    fragColor = vec4(u_color * glow, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

/**
 * Valid blur sizes supported by Tailwind CSS.
 */
export type BlurSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

/**
 * Props for the SmokeyBackground component.
 */
export interface SmokeyBackgroundProps {
  backdropBlurAmount?: string;
  color?: string;
  className?: string;
}

/**
 * A mapping from blur size names to Tailwind CSS classes.
 */
const blurClassMap: Record<BlurSize, string> = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
  "3xl": "backdrop-blur-3xl",
};

/**
 * A React component that renders an interactive WebGL shader background.
 */
export function SmokeyBackground({
  backdropBlurAmount = "sm",
  color = "#E11D48", // Default SIGAP Crimson Rose (or "#1E40AF" for Deep Blue)
  className = "",
}: SmokeyBackgroundProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Helper to convert hex color to RGB (0-1 range)
  const hexToRgb = (hex: string): [number, number, number] => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
    const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
    const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
    return [
      isNaN(r) ? 0.88 : r,
      isNaN(g) ? 0.11 : g,
      isNaN(b) ? 0.28 : b
    ];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.warn("WebGL not supported or disabled");
      return;
    }

    const compileShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexSmokeySource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentSmokeySource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const iMouseLocation = gl.getUniformLocation(program, "iMouse");
    const uColorLocation = gl.getUniformLocation(program, "u_color");

    const startTime = Date.now();
    const [r, g, b] = hexToRgb(color);
    gl.uniform3f(uColorLocation, r, g, b);

    let animationFrameId: number;

    const render = () => {
      if (!canvas) return;
      const width = canvas.clientWidth || 300;
      const height = canvas.clientHeight || 300;

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);

      const currentTime = (Date.now() - startTime) / 1000;

      gl.uniform2f(iResolutionLocation, width, height);
      gl.uniform1f(iTimeLocation, currentTime);
      gl.uniform2f(
        iMouseLocation,
        isHovering ? mousePosition.x : width / 2,
        isHovering ? height - mousePosition.y : height / 2
      );

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({ x: event.clientX - rect.left, y: event.clientY - rect.top });
    };
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [isHovering, mousePosition, color]);

  const finalBlurClass = blurClassMap[backdropBlurAmount as BlurSize] || blurClassMap["sm"];

  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-auto ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className={`absolute inset-0 ${finalBlurClass} pointer-events-none`}></div>
    </div>
  );
}

/**
 * Props for the LoginForm component.
 */
export interface LoginFormProps {
  title?: string;
  subtitle?: string;
  accentColor?: 'sigap-rose' | 'sigap-amber' | 'sigap-blue' | 'default-blue';
  onLogin?: (email: string, role?: string) => void;
  className?: string;
}

/**
 * A glassmorphism-style login form component with animated floating labels,
 * Google login / SSO Kemensos, and SIGAP theme customization.
 */
export function LoginForm({
  title = "Portal SIGAP",
  subtitle = "Sistem Gerak Cepat Perlindungan Sosial Adaptif",
  accentColor = "sigap-rose",
  onLogin,
  className = "",
}: LoginFormProps = {}): React.JSX.Element {
  const [email, setEmail] = useState("budi.santoso@dinsos.daerah.go.id");
  const [password, setPassword] = useState("••••••••••••");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      if (onLogin) {
        onLogin(email, "admin_daerah");
      }
    }, 800);
  };

  const buttonAccent = 
    accentColor === 'sigap-rose' 
      ? 'bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 hover:from-rose-500 hover:to-amber-500 focus:ring-rose-500'
      : accentColor === 'sigap-amber'
      ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-rose-600 hover:from-amber-500 hover:to-rose-500 focus:ring-amber-500'
      : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';

  return (
    <div className={`w-full max-w-sm p-8 space-y-6 bg-slate-950/40 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl shadow-black/80 relative z-10 ${className}`}>
      {/* Top ambient highlight line */}
      <div className="absolute -top-px left-8 right-8 h-[2px] bg-gradient-to-r from-rose-500 via-amber-400 to-blue-500"></div>

      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 to-amber-500 text-white mb-3 shadow-lg shadow-rose-900/40 border border-white/20">
          <Shield className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black tracking-tight text-white">{title}</h2>
        <p className="mt-1 text-xs text-rose-200/90 font-medium leading-relaxed">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input with Animated Label */}
        <div className="relative z-0">
          <input
            type="email"
            id="floating_email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-slate-400/40 appearance-none focus:outline-none focus:ring-0 focus:border-rose-400 peer"
            placeholder=" " 
            required
          />
          <label
            htmlFor="floating_email"
            className="absolute text-xs text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            <User className="inline-block mr-2 -mt-1" size={14} />
            Alamat Email Kedinasan / NIP
          </label>
        </div>

        {/* Password Input with Animated Label */}
        <div className="relative z-0">
          <input
            type="password"
            id="floating_password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-slate-400/40 appearance-none focus:outline-none focus:ring-0 focus:border-rose-400 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="absolute text-xs text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-rose-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            <Lock className="inline-block mr-2 -mt-1" size={14} />
            Kata Sandi
          </label>
        </div>

        <div className="flex items-center justify-between text-xs">
          <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded border-slate-700 bg-slate-900/60 text-rose-500 focus:ring-rose-400" />
            <span>Ingat saya</span>
          </label>
          <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Silakan hubungi Helpdesk Pusdatin Kemensos untuk reset kata sandi."); }} className="text-xs text-rose-300 hover:text-white transition font-medium">Lupa Kata Sandi?</a>
        </div>
        
        <GradientButton
          type="submit"
          disabled={isSubmitting}
          variant="rose"
          size="full"
          className="shadow-xl shadow-rose-950/50"
        >
          {isSubmitting ? (
            <span>Memverifikasi Kredensial...</span>
          ) : isSuccess ? (
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Berhasil Masuk!</span>
            </span>
          ) : (
            <>
              <span>Masuk Portal SIGAP</span>
              <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </GradientButton>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-white/15"></div>
          <span className="flex-shrink mx-3 text-slate-400 text-[10px] font-bold uppercase tracking-wider">ATAU MASUK MELALUI</span>
          <div className="flex-grow border-t border-white/15"></div>
        </div>

        {/* Google / SSO Login Button with Gradient styling */}
        <GradientButton
          type="button"
          variant="variant"
          size="full"
          onClick={() => {
            if (onLogin) onLogin("sso.kemensos@go.id", "admin_pusat");
          }}
          className="!text-xs !font-semibold text-slate-100"
        >
          <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 8.841C34.553 4.806 29.613 2.5 24 2.5C11.983 2.5 2.5 11.983 2.5 24s9.483 21.5 21.5 21.5S45.5 36.017 45.5 24c0-1.538-.135-3.022-.389-4.417z"></path>
            <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12.5 24 12.5c3.059 0 5.842 1.154 7.961 3.039l5.839-5.841C34.553 4.806 29.613 2.5 24 2.5C16.318 2.5 9.642 6.723 6.306 14.691z"></path>
            <path fill="#4CAF50" d="M24 45.5c5.613 0 10.553-2.306 14.802-6.341l-5.839-5.841C30.842 35.846 27.059 38 24 38c-5.039 0-9.345-2.608-11.124-6.481l-6.571 4.819C9.642 41.277 16.318 45.5 24 45.5z"></path>
            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l5.839 5.841C44.196 35.123 45.5 29.837 45.5 24c0-1.538-.135-3.022-.389-4.417z"></path>
          </svg>
          <span>Masuk dengan Google / SSO ASN</span>
        </GradientButton>
      </form>

      <div className="pt-2 text-center text-[11px] text-slate-400">
        Belum memiliki hak akses NIP?{" "}
        <a 
          href="#helpdesk" 
          onClick={(e) => { e.preventDefault(); alert("Registrasi operator baru dikelola oleh Admin Pusdatin Kemensos melalui formulir penugasan resmi."); }}
          className="font-bold text-rose-300 hover:text-white transition"
        >
          Ajukan Akses Operator
        </a>
      </div>
    </div>
  );
}
