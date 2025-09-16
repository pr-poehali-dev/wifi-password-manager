import React, { useState } from 'react';

interface WiFiNetwork {
  id: string;
  name: string;
  signalStrength: number;
  isSecure: boolean;
  isConnected?: boolean;
}

const mockNetworks: WiFiNetwork[] = [
  { id: '1', name: 'Home WiFi', signalStrength: 4, isSecure: true, isConnected: true },
  { id: '2', name: 'Office Network', signalStrength: 3, isSecure: true },
  { id: '3', name: 'Guest WiFi', signalStrength: 2, isSecure: false },
  { id: '4', name: 'Neighbors WiFi', signalStrength: 1, isSecure: true },
  { id: '5', name: 'Coffee Shop Free', signalStrength: 3, isSecure: false },
];

export default function Index() {
  const [networks] = useState<WiFiNetwork[]>(mockNetworks);
  const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null);
  const [password, setPassword] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  const getSignalBars = (strength: number) => {
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        style={{
          width: '4px',
          height: `${8 + i * 4}px`,
          backgroundColor: i < strength ? '#3B82F6' : '#E5E7EB',
          borderRadius: '2px',
          marginRight: '2px'
        }}
      />
    ));
  };

  const handleNetworkSelect = (network: WiFiNetwork) => {
    if (network.isConnected) return;
    setSelectedNetwork(network);
    setPassword('');
    
    if (!network.isSecure) {
      handleConnect(network, '');
    }
  };

  const handleConnect = async (network: WiFiNetwork, pass: string) => {
    setIsConnecting(true);
    
    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSelectedNetwork(null);
    setPassword('');
    setIsConnecting(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNetwork) {
      handleConnect(selectedNetwork, password);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F9FAFB 0%, #EBF4FF 100%)',
      padding: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '400px',
        margin: '0 auto',
        paddingTop: '32px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#111827',
            margin: '0 0 8px 0'
          }}>
            WiFi Networks
          </h1>
          <p style={{
            color: '#6B7280',
            margin: '0',
            fontSize: '16px'
          }}>
            Select a network to connect
          </p>
        </div>

        {/* Device ID Section */}
        <div style={{
          background: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '32px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          color: 'white'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              margin: '0 0 4px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              📱 Device Identification
            </h2>
            <p style={{
              fontSize: '14px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0'
            }}>
              Enter your device ID for network access
            </p>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              marginBottom: '8px'
            }}>
              Device ID
            </label>
            <input
              type="text"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              placeholder="Enter your device identifier"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                fontSize: '16px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'white';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px'
          }}>
            <span>🛡️</span>
            <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' }}>
              Secure device authentication enabled
            </span>
          </div>
        </div>

        {/* Networks List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 16px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#111827'
          }}>
            📶 Available Networks
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {networks.map((network) => (
              <div
                key={network.id}
                onClick={() => handleNetworkSelect(network)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderRadius: '12px',
                  border: network.isConnected ? '2px solid #3B82F6' : '2px solid #E5E7EB',
                  backgroundColor: network.isConnected ? '#EBF4FF' : 'white',
                  cursor: network.isConnected ? 'default' : 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!network.isConnected) {
                    e.currentTarget.style.borderColor = '#D1D5DB';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!network.isConnected) {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    fontSize: '20px',
                    color: network.isConnected ? '#3B82F6' : '#6B7280'
                  }}>
                    📶
                  </span>
                  <div>
                    <div style={{
                      fontWeight: '500',
                      color: '#111827',
                      fontSize: '16px'
                    }}>
                      {network.name}
                    </div>
                    {network.isConnected && (
                      <span style={{
                        fontSize: '12px',
                        backgroundColor: '#E5E7EB',
                        color: '#374151',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        marginTop: '4px',
                        display: 'inline-block'
                      }}>
                        Connected
                      </span>
                    )}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'end', gap: '2px' }}>
                    {getSignalBars(network.signalStrength)}
                  </div>
                  
                  {network.isSecure && (
                    <span style={{ fontSize: '16px', color: '#6B7280' }}>🔒</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Password Input */}
        {selectedNetwork && selectedNetwork.isSecure && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            animation: 'fadeIn 0.3s ease-out'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              margin: '0 0 16px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#111827'
            }}>
              🔑 Connect to {selectedNetwork.name}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  marginBottom: '8px',
                  color: '#374151'
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter WiFi password"
                    required
                    autoFocus
                    style={{
                      width: '100%',
                      padding: '12px 40px 12px 12px',
                      borderRadius: '8px',
                      border: '2px solid #E5E7EB',
                      fontSize: '16px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3B82F6';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#E5E7EB';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: '#6B7280'
                    }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px'
              }}>
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                  style={{ marginRight: '4px' }}
                />
                <label htmlFor="remember" style={{
                  fontSize: '14px',
                  color: '#6B7280'
                }}>
                  Remember this password
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedNetwork(null)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #E5E7EB',
                    backgroundColor: 'white',
                    color: '#374151',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F9FAFB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isConnecting || !password.trim()}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: isConnecting || !password.trim() ? '#9CA3AF' : '#3B82F6',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: '500',
                    cursor: isConnecting || !password.trim() ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isConnecting && password.trim()) {
                      e.currentTarget.style.backgroundColor = '#2563EB';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isConnecting && password.trim()) {
                      e.currentTarget.style.backgroundColor = '#3B82F6';
                    }
                  }}
                >
                  {isConnecting ? '🔄 Connecting...' : 'Connect'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Info Card */}
        <div style={{
          marginTop: '24px',
          background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
          borderRadius: '16px',
          padding: '16px',
          color: 'white'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '20px', marginTop: '2px' }}>ℹ️</span>
            <div style={{ fontSize: '14px' }}>
              <p style={{ fontWeight: '500', margin: '0 0 4px 0' }}>
                Secure Connection
              </p>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                margin: '0',
                lineHeight: '1.4'
              }}>
                Your saved passwords are encrypted and stored locally for quick reconnection.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}