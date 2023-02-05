/* eslint-disable @typescript-eslint/no-namespace */
import { ipcMain } from 'electron'
import { getFonts } from 'font-list'
import saveProgramSettings from 'src-electron/api/system/api/saveProgramSettings'
import getThemes from 'app/src-electron/api/system/api/getThemes'
import readUserTheme from 'src-electron/api/system/api/readUserTheme'
import getModulesRegistry from 'src-electron/api/system/api/getModulesRegistry'
import { getInstalledModules } from './api/getIntalledModules'
import { ChanelKey } from 'app/src-electron/electron'

export const SystemChanels = {
  'SAVE_SETTINGS': Symbol('system:save-settings') as ChanelKey<ReturnType<typeof saveProgramSettings>>,
  'GET_THEMES': Symbol('system:get-themes') as ChanelKey<ReturnType<typeof getThemes>>,
  'GET_USER_THEMES': Symbol('system:get-user-theme') as ChanelKey<ReturnType<typeof readUserTheme>>,
  'GET_FONT_LIST': Symbol('system:get-font-list') as ChanelKey<ReturnType<typeof getFonts>>,
  'GET_MODULES_REGISTRY': Symbol('system:get-modules-registry') as ChanelKey<ReturnType<typeof getModulesRegistry>>,
  'GET_INSTALLED_MODULES': Symbol('system:get-installed-modules') as ChanelKey<ReturnType<typeof getInstalledModules>>,
}

export default () => {
  ipcMain.handle(SystemChanels.SAVE_SETTINGS, (_, state) => saveProgramSettings(state))
  ipcMain.handle(SystemChanels.GET_THEMES, () => getThemes())
  ipcMain.handle(SystemChanels.GET_USER_THEMES, (event, themeName) => readUserTheme(themeName))
  ipcMain.handle(SystemChanels.GET_FONT_LIST, () => getFonts())
  ipcMain.handle(SystemChanels.GET_MODULES_REGISTRY, () => getModulesRegistry())
  ipcMain.handle(SystemChanels.GET_INSTALLED_MODULES, () => getInstalledModules())
}
