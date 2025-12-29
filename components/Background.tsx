"use client";

import { motion } from "framer-motion";

export default function Background() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[var(--background)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,91,150,0.05)_0%,rgba(0,0,0,0)_70%)]" />

            {/* Gear 1 - Top Left */}
            <motion.div
                className="absolute -top-20 -left-20 text-[var(--color-mech-gray)] opacity-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
                <GearIcon size={400} />
            </motion.div>

            {/* Gear 2 - Bottom Right */}
            <motion.div
                className="absolute -bottom-32 -right-32 text-[var(--color-ind-blue)] opacity-5"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
                <GearIcon size={500} />
            </motion.div>

            {/* Gear 3 - Middle Right small */}
            <motion.div
                className="absolute top-1/3 -right-10 text-[var(--color-gold)] opacity-5"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                <GearIcon size={200} />
            </motion.div>
        </div>
    );
}

function GearIcon({ size }: { size: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" />
            <path fillRule="evenodd" clipRule="evenodd" d="M21.808 9.29003L19.967 8.98303C19.78 7.91003 19.426 6.89203 18.931 5.96803L20.279 4.62003C20.669 4.23003 20.669 3.59603 20.279 3.20503L18.794 1.72103C18.404 1.33003 17.771 1.33003 17.38 1.72103L16.032 3.06903C15.108 2.57403 14.091 2.22003 13.018 2.03303L12.71 0.191026C12.646 -0.199974 12.023 -0.199974 11.958 -0.199974H12.042C11.698 -0.199974 11.385 0.0210255 11.29 0.191026L10.982 2.03303C9.91003 2.22003 8.89203 2.57403 7.96803 3.06903L6.62003 1.72103C6.23003 1.33003 5.59603 1.33003 5.20503 1.72103L3.72103 3.20503C3.33003 3.59603 3.33003 4.22903 3.72103 4.62003L5.06903 5.96803C4.57403 6.89203 4.22003 7.90903 4.03303 8.98203L2.19103 9.29003C1.84803 9.34703 1.62603 9.69903 1.62603 10.043V13.958C1.62603 14.301 1.84703 14.654 2.19103 14.711L4.03303 15.018C4.22003 16.091 4.57403 17.108 5.06903 18.032L3.72103 19.38C3.33003 19.771 3.33003 20.404 3.72103 20.795L5.20503 22.279C5.59603 22.67 6.22903 22.67 6.62003 22.279L7.96803 20.931C8.89203 21.426 9.90903 21.78 10.982 21.967L11.29 23.809C11.385 24.38 12.617 24.38 12.71 23.809L13.018 21.967C14.091 21.78 15.108 21.426 16.032 20.931L17.38 22.279C17.771 22.67 18.404 22.67 18.794 22.279L20.279 20.795C20.669 20.404 20.669 19.771 20.279 19.38L18.931 18.032C19.426 17.108 19.78 16.091 19.967 15.018L21.808 14.711C22.152 14.654 22.374 14.302 22.374 13.958V10.043C22.374 9.69903 22.152 9.34703 21.808 9.29003ZM12 17C9.23903 17 7.00003 14.762 7.00003 12C7.00003 9.23903 9.23903 7 12 7C14.761 7 17 9.23903 17 12C17 14.762 14.761 17 12 17Z" />
        </svg>
    );
}
