import { Config } from '@remotion/cli/config';

Config.setPublicDir('../public');
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setCodec('vp9');
Config.setConcurrency(4);
Config.setPixelFormat('yuv420p');
