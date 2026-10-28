import { useRef, useState, type ReactNode } from 'react';
import { Button, Typography } from 'antd';
import { CloudUploadOutlined, ExperimentOutlined } from '@ant-design/icons';

interface FileDropZoneProps {
  /** input accept 属性 */
  accept?: string;
  title: string;
  hints: ReactNode;
  loading: boolean;
  onFile: (file: File) => void;
  /** 示例存档地址（public 下相对路径）；不传则不显示示例按钮 */
  sampleUrl?: string;
  sampleName?: string;
}

/** 通用拖放区：点击选择 / 拖放 / 载入示例存档 */
export function FileDropZone({
  accept = '.sav,.bin,application/octet-stream',
  title,
  hints,
  loading,
  onFile,
  sampleUrl,
  sampleName = 'sample.sav',
}: FileDropZoneProps) {
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
        accept={accept}
        hidden
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = '';
        }}
      />
      <CloudUploadOutlined className="dropzone-icon" />
      <div className="dropzone-title">{title}</div>
      <div className="dropzone-hint">{hints}</div>
      {sampleUrl && (
        <Button
          style={{ marginTop: 20 }}
          icon={<ExperimentOutlined />}
          loading={loading}
          onClick={async (event) => {
            event.stopPropagation();
            const response = await fetch(sampleUrl);
            if (!response.ok) return;
            const buffer = await response.arrayBuffer();
            onFile(new File([buffer], sampleName, { type: 'application/octet-stream' }));
          }}
        >
          载入示例存档
        </Button>
      )}
      <div className="dropzone-hint" style={{ marginTop: 12 }}>
        存档只在本机浏览器解析，不会上传；修改前请务必备份原文件。
        <Typography.Text code style={{ marginLeft: 6 }}>
          {accept}
        </Typography.Text>
      </div>
    </div>
  );
}
