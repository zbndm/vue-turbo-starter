import type { Preset } from '@unocss/core'
import type { UnocssNuxtOptions } from '@unocss/nuxt'
import type { Theme, PresetWindOptions } from '@unocss/preset-wind'
import { presetWind, transformerDirectives, transformerVariantGroup } from 'unocss'
import { UserConfig } from '@unocss/core'
import { rules } from './rules'
import { theme } from './theme'

// @unocss-include

/**
 * Preset Vue Turbo for UnoCSS
 */
export const presetVueTurbo = (): Preset<Theme> => {
  return {
    name: 'unocss-preset-vue-turbo',
    rules,
    safelist: [
      'hidden',
    ],
    preflights: [
      // {
      //   layer: 'basestyles',
      //   getCSS: () => `
      //     :root {
      //       color-scheme: light dark;
      //       color: rgba(255, 255, 255, 0.87);
      //       background-color: #242424;
      //     }

      //     @media (prefers-color-scheme: light) {
      //       :root {
      //         color: #213547;
      //         background-color: #ffffff;
      //       }
      //       a:hover {
      //         color: #747bff;
      //       }
      //     }
      //   `,
      // },
    ],
    shortcuts: [],
    theme,
  }
}

interface CustomOptions {
  /**
   * Custom options for PresetWind
   */
  customPresetWindOptions?: PresetWindOptions
}
interface CustomUserConfig extends UserConfig, CustomOptions {}
interface CustomNuxtConfig extends UnocssNuxtOptions, CustomOptions {}

/**
 * Extends unocss/vite Plugin Options Config
 */
export const extendUnocssOptions = ({ customPresetWindOptions, ...options }: CustomUserConfig = {}): UserConfig => {
  return {
    ...options,
    presets: [
      presetWind({
        ...(customPresetWindOptions || {}),
      }),
      presetVueTurbo(),
      ...(options.presets || []),
    ],
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
      ...(options.transformers || []),
    ],
  }
}

/**
 * Extends unocss/nuxt Plugin Options Config
 */
export function extendUnocssNuxtOptions (options: CustomNuxtConfig = {}): UnocssNuxtOptions {
  return {
    preflight: true,
    ...extendUnocssOptions(options),
  }
}
