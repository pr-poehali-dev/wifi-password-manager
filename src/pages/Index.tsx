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
          width: '3px',
          height: `${6 + i * 3}px`,
          backgroundColor: i < strength ? '#A7C7E7' : '#F0F0F0',
          borderRadius: '1px',
          marginRight: '1px'
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
      backgroundColor: '#F8F9FA',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '380px',
        margin: '0 auto',
        paddingTop: '20px'
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'normal',
            color: '#4A4A4A',
            margin: '0 0 8px 0'
          }}>
            WiFi Networks
          </h1>
          <p style={{
            color: '#7A7A7A',
            margin: '0',
            fontSize: '14px'
          }}>
            Select a network to connect
          </p>
        </div>

        <div style={{
          backgroundColor: '#E8F4F8',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '25px',
          border: '1px solid #D6EBF0'
        }}>
          <div style={{ marginBottom: '15px' }}>
            <h2 style={{
              fontSize: '16px',
              fontWeight: 'normal',
              margin: '0 0 5px 0',
              color: '#5A5A5A'
            }}>
              Device Identification
            </h2>
            <p style={{
              fontSize: '12px',
              color: '#8A8A8A',
              margin: '0'
            }}>
              Enter your device ID for network access
            </p>
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              marginBottom: '5px',
              color: '#6A6A6A'
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
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #C8D8DC',
                backgroundColor: 'white',
                color: '#4A4A4A',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>
          
          <div style={{
            padding: '8px',
            backgroundColor: '#D4F1E8',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#5A5A5A'
          }}>
            Secure device authentication enabled
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid #E8E8E8'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 'normal',
            margin: '0 0 15px 0',
            color: '#5A5A5A'
          }}>
            Available Networks
          </h3>
          
          <div>
            {networks.map((network) => (
              <div
                key={network.id}
                onClick={() => handleNetworkSelect(network)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  marginBottom: '8px',
                  borderRadius: '6px',
                  border: network.isConnected ? '1px solid #B8D4E3' : '1px solid #E8E8E8',
                  backgroundColor: network.isConnected ? '#F0F8FB' : '#FAFAFA',
                  cursor: network.isConnected ? 'default' : 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div>
                    <div style={{
                      fontWeight: 'normal',
                      color: '#4A4A4A',
                      fontSize: '14px'
                    }}>
                      {network.name}
                    </div>
                    {network.isConnected && (
                      <span style={{
                        fontSize: '10px',
                        backgroundColor: '#E0E0E0',
                        color: '#6A6A6A',
                        padding: '2px 6px',
                        borderRadius: '8px',
                        marginTop: '3px',
                        display: 'inline-block'
                      }}>
                        Connected
                      </span>
                    )}
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'end', gap: '1px' }}>
                    {getSignalBars(network.signalStrength)}
                  </div>
                  
                  {network.isSecure && (
                    <span style={{ fontSize: '12px', color: '#8A8A8A' }}>🔒</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedNetwork && selectedNetwork.isSecure && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            border: '1px solid #E8E8E8'
          }}>
            <h3 style={{
              fontSize: '14px',
              fontWeight: 'normal',
              margin: '0 0 15px 0',
              color: '#5A5A5A'
            }}>
              Connect to {selectedNetwork.name}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '12px',
                  marginBottom: '5px',
                  color: '#6A6A6A'
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
                      padding: '10px 35px 10px 10px',
                      borderRadius: '4px',
                      border: '1px solid #D8D8D8',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                      backgroundColor: '#FAFAFA'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      color: '#8A8A8A'
                    }}
                  >
                    {showPassword ? 'hide' : 'show'}
                  </button>
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '18px'
              }}>
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberPassword}
                  onChange={(e) => setRememberPassword(e.target.checked)}
                />
                <label htmlFor="remember" style={{
                  fontSize: '12px',
                  color: '#7A7A7A'
                }}>
                  Remember this password
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedNetwork(null)}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '4px',
                    border: '1px solid #D8D8D8',
                    backgroundColor: '#F5F5F5',
                    color: '#6A6A6A',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isConnecting || !password.trim()}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: isConnecting || !password.trim() ? '#E0E0E0' : '#C8E6C9',
                    color: isConnecting || !password.trim() ? '#A0A0A0' : '#4A4A4A',
                    fontSize: '14px',
                    cursor: isConnecting || !password.trim() ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={{
          marginTop: '20px',
          backgroundColor: '#F0F4F8',
          borderRadius: '6px',
          padding: '12px',
          border: '1px solid #E0E8ED'
        }}>
          <div style={{ fontSize: '12px', color: '#6A6A6A', lineHeight: '1.4' }}>
            <strong>Secure Connection:</strong> Your saved passwords are stored locally for quick reconnection.
          </div>
        </div>
      </div>
    </div>
  );
}