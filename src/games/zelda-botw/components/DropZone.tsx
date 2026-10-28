import { useRef, useState } from 'react';
import { Button, Typography } from 'antd';
import { CloudUploadOutlined, ExperimentOutlined } from '@ant-design/icons';

interface DropZoneProps {
  loading: boolean;
  onFile: (file: File) => void;
}

/** 未载入存档时的拖放区：支持点击选择、拖放、载入示例存档 */
export function DropZone({ loading, onFile }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      className={`dropzone${dragging ? ' dragging' : ''}`}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') inputRef.current?.click();
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".sav,.bin,application/octet-stream"
        hidden
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = '';
        }}
      />
      <CloudUploadOutlined className="dropzone-icon" />
      <div className="dropzone-title">拖入 game_data.sav，或点击选择文件</div>
      <div className="dropzone-hint">
        支持 Wii U 与 Switch 版本的旷野之息存档（v1.0 – v1.8/v1.9）。
        <br />
        所有解析与修改都在本地浏览器完成，不会上传任何数据。
      </div>
      <Button
        style={{ marginTop: 20 }}
        icon={<ExperimentOutlined />}
        loading={loading}
        onClick={async (event) => {
          event.stopPropagation();
          const response = await fetch('assets/game_data.sav');
          if (!response.ok) return;
          const buffer = await response.arrayBuffer();
          onFile(new File([buffer], 'game_data.sav', { type: 'application/octet-stream' }));
        }}
      >
        载入示例存档
      </Button>
      <div className="dropzone-hint" style={{ marginTop: 12 }}>
        标题栏中的 <Typography.Text code>save_0/0..5</Typography.Text> 每个子目录各有一个
        game_data.sav
      </div>
    </div>
  );
}
