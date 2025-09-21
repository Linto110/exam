import React, { useState } from 'react';

const CCTVConfig = ({ onConfigSave, onClose }) => {
  const [config, setConfig] = useState({
    name: '',
    ip: '',
    port: '554',
    username: '',
    password: '',
    streamPath: '/stream1',
    protocol: 'rtsp'
  });

  const [testStatus, setTestStatus] = useState(null);
  const [testing, setTesting] = useState(false);

  const handleInputChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateStreamUrl = () => {
    const { protocol, username, password, ip, port, streamPath } = config;
    
    if (username && password) {
      return `${protocol}://${username}:${password}@${ip}:${port}${streamPath}`;
    } else {
      return `${protocol}://${ip}:${port}${streamPath}`;
    }
  };

  const testConnection = async () => {
    setTesting(true);
    setTestStatus(null);

    try {
      const streamUrl = generateStreamUrl();
      
      // Create a test video element
      const testVideo = document.createElement('video');
      testVideo.muted = true;
      testVideo.playsInline = true;
      
      // Set up event listeners
      const handleLoadStart = () => {
        setTestStatus('success');
        setTesting(false);
      };
      
      const handleError = () => {
        setTestStatus('error');
        setTesting(false);
      };
      
      testVideo.addEventListener('loadstart', handleLoadStart);
      testVideo.addEventListener('error', handleError);
      
      // Set timeout for test
      setTimeout(() => {
        if (testing) {
          setTestStatus('timeout');
          setTesting(false);
        }
      }, 10000);
      
      // Try to load the stream
      testVideo.src = streamUrl;
      testVideo.load();
      
    } catch (error) {
      console.error('Test connection error:', error);
      setTestStatus('error');
      setTesting(false);
    }
  };

  const handleSave = () => {
    const streamUrl = generateStreamUrl();
    onConfigSave({
      name: config.name,
      url: streamUrl,
      config: config
    });
  };

  const presetConfigs = [
    {
      name: 'Hikvision Default',
      ip: '192.168.1.100',
      port: '554',
      username: 'admin',
      password: 'admin123',
      streamPath: '/Streaming/Channels/101'
    },
    {
      name: 'Dahua Default',
      ip: '192.168.1.101',
      port: '554',
      username: 'admin',
      password: 'admin',
      streamPath: '/cam/realmonitor?channel=1&subtype=0'
    },
    {
      name: 'Generic RTSP',
      ip: '192.168.1.102',
      port: '554',
      username: '',
      password: '',
      streamPath: '/stream1'
    }
  ];

  const loadPreset = (preset) => {
    setConfig(prev => ({
      ...prev,
      ...preset
    }));
  };

  return (
    <div className="modal show d-block modal-enhanced" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">CCTV Camera Configuration</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">

            {/* Preset Configurations */}
            <div className="mb-4">
              <h6 className="text-white mb-3">Quick Setup (Presets)</h6>
              <div className="row g-2">
                {presetConfigs.map((preset, index) => (
                  <div key={index} className="col-md-4">
                    <button
                      type="button"
                      onClick={() => loadPreset(preset)}
                      className="btn btn-outline-secondary w-100 text-start"
                    >
                      <div className="fw-bold">{preset.name}</div>
                      <small className="text-muted">{preset.ip}:{preset.port}</small>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Manual Configuration */}
            <div>
              <h6 className="text-white mb-3">Manual Configuration</h6>
              
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label text-white">Camera Name</label>
                  <input
                    type="text"
                    className="form-control form-control-enhanced bg-dark text-white border-secondary"
                    value={config.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g., Main Entrance Camera"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-white">Protocol</label>
                  <select
                    className="form-select form-control-enhanced bg-dark text-white border-secondary"
                    value={config.protocol}
                    onChange={(e) => handleInputChange('protocol', e.target.value)}
                  >
                    <option value="rtsp">RTSP</option>
                    <option value="http">HTTP</option>
                    <option value="https">HTTPS</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label text-white">IP Address</label>
                  <input
                    type="text"
                    className="form-control form-control-enhanced bg-dark text-white border-secondary"
                    value={config.ip}
                    onChange={(e) => handleInputChange('ip', e.target.value)}
                    placeholder="192.168.1.100"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-white">Port</label>
                  <input
                    type="text"
                    className="form-control form-control-enhanced bg-dark text-white border-secondary"
                    value={config.port}
                    onChange={(e) => handleInputChange('port', e.target.value)}
                    placeholder="554"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-white">Username</label>
                  <input
                    type="text"
                    className="form-control form-control-enhanced bg-dark text-white border-secondary"
                    value={config.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="admin"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label text-white">Password</label>
                  <input
                    type="password"
                    className="form-control form-control-enhanced bg-dark text-white border-secondary"
                    value={config.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="password"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label text-white">Stream Path</label>
                  <input
                    type="text"
                    className="form-control form-control-enhanced bg-dark text-white border-secondary"
                    value={config.streamPath}
                    onChange={(e) => handleInputChange('streamPath', e.target.value)}
                    placeholder="/stream1"
                  />
                </div>
              </div>
            </div>

            {/* Generated URL Preview */}
            <div className="mb-3">
              <label className="form-label text-white">Generated Stream URL</label>
              <div className="bg-dark p-3 rounded border border-secondary">
                <code className="text-success small" style={{ wordBreak: 'break-all' }}>
                  {generateStreamUrl()}
                </code>
              </div>
            </div>

            {/* Test Connection */}
            <div className="d-flex gap-2 mb-3">
              <button
                type="button"
                onClick={testConnection}
                disabled={testing || !config.ip}
                className={`btn ${
                  testing || !config.ip
                    ? 'btn-secondary'
                    : 'btn-warning'
                }`}
              >
                {testing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Testing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plug me-2"></i>Test Connection
                  </>
                )}
              </button>

              {testStatus && (
                <div className={`alert ${
                  testStatus === 'success' ? 'alert-success' :
                  testStatus === 'error' ? 'alert-danger' :
                  'alert-warning'
                } mb-0`}>
                  {testStatus === 'success' ? 'Connection successful!' :
                   testStatus === 'error' ? 'Connection failed' :
                   'Connection timeout'}
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              onClick={handleSave}
              disabled={!config.ip}
              className={`btn ${
                !config.ip
                  ? 'btn-secondary'
                  : 'btn-primary'
              }`}
            >
              <i className="fas fa-save me-2"></i>Save Configuration
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCTVConfig;
