import { CompositeNumberInput, CompositeSlider, FormControl, FormLabel, Switch } from '@invoke-ai/ui-library';
import { useProcessorNodeChanged } from 'features/controlAdapters/components/hooks/useProcessorNodeChanged';
import { useGetDefaultForControlnetProcessor } from 'features/controlAdapters/hooks/useGetDefaultForControlnetProcessor';
import type { RequiredHedImageProcessorInvocation } from 'features/controlAdapters/store/types';
import type { ChangeEvent } from 'react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import ProcessorWrapper from './common/ProcessorWrapper';

type HedProcessorProps = {
  controlNetId: string;
  processorNode: RequiredHedImageProcessorInvocation;
  isEnabled: boolean;
};

const HedPreprocessor = (props: HedProcessorProps) => {
  const {
    controlNetId,
    processorNode: { detect_resolution, image_resolution, scribble },
    isEnabled,
  } = props;
  const processorChanged = useProcessorNodeChanged();
  const { t } = useTranslation();

  const defaults = useGetDefaultForControlnetProcessor('hed_image_processor') as RequiredHedImageProcessorInvocation;

  const handleDetectResolutionChanged = useCallback(
    (v: number) => {
      processorChanged(controlNetId, { detect_resolution: v });
    },
    [controlNetId, processorChanged]
  );

  const handleImageResolutionChanged = useCallback(
    (v: number) => {
      processorChanged(controlNetId, { image_resolution: v });
    },
    [controlNetId, processorChanged]
  );

  const handleScribbleChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      processorChanged(controlNetId, { scribble: e.target.checked });
    },
    [controlNetId, processorChanged]
  );

  return (
    <ProcessorWrapper>
      <FormControl isDisabled={!isEnabled}>
        <FormLabel>{t('controlnet.detectResolution')}</FormLabel>
        <CompositeSlider
          value={detect_resolution}
          defaultValue={defaults.detect_resolution}
          onChange={handleDetectResolutionChanged}
          min={0}
          max={4096}
          marks
        />
        <CompositeNumberInput
          value={detect_resolution}
          defaultValue={defaults.detect_resolution}
          onChange={handleDetectResolutionChanged}
          min={0}
          max={4096}
        />
      </FormControl>
      <FormControl isDisabled={!isEnabled}>
        <FormLabel>{t('controlnet.imageResolution')}</FormLabel>
        <CompositeSlider
          value={image_resolution}
          onChange={handleImageResolutionChanged}
          defaultValue={defaults.image_resolution}
          min={0}
          max={4096}
          marks
        />
        <CompositeNumberInput
          value={image_resolution}
          onChange={handleImageResolutionChanged}
          defaultValue={defaults.image_resolution}
          min={0}
          max={4096}
        />
      </FormControl>
      <FormControl isDisabled={!isEnabled}>
        <FormLabel>{t('controlnet.scribble')}</FormLabel>
        <Switch isChecked={scribble} onChange={handleScribbleChanged} />
      </FormControl>
    </ProcessorWrapper>
  );
};

export default memo(HedPreprocessor);
