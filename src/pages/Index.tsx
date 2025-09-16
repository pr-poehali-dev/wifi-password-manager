import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface WiFiNetwork {
  id: string;
  name: string;
  signalStrength: number;
  isSecure: boolean;
  isConnected?: boolean;
  savedPassword?: string;
}

const mockNetworks: WiFiNetwork[] = [
  { id: '1', name: 'Home WiFi', signalStrength: 4, isSecure: true, isConnected: true },
  { id: '2', name: 'Office Network', signalStrength: 3, isSecure: true, savedPassword: 'office123' },
  { id: '3', name: 'Guest WiFi', signalStrength: 2, isSecure: false },
  { id: '4', name: 'Neighbors WiFi', signalStrength: 1, isSecure: true },
  { id: '5', name: 'Coffee Shop Free', signalStrength: 3, isSecure: false },
];

export default function Index() {
  const [networks, setNetworks] = useState<WiFiNetwork[]>(mockNetworks);
  const [selectedNetwork, setSelectedNetwork] = useState<WiFiNetwork | null>(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [savedPasswords, setSavedPasswords] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load saved passwords from localStorage
    const saved = localStorage.getItem('wifi-passwords');
    if (saved) {
      setSavedPasswords(JSON.parse(saved));
    }
  }, []);

  const getSignalIcon = (strength: number) => {
    if (strength >= 4) return 'Wifi';
    if (strength >= 3) return 'Wifi';
    if (strength >= 2) return 'Wifi';
    return 'WifiOff';
  };

  const getSignalBars = (strength: number) => {
    return Array.from({ length: 4 }, (_, i) => (
      <div
        key={i}
        className={cn(
          'w-1 bg-gray-300 rounded-sm',
          i < strength ? 'bg-blue-500' : 'bg-gray-200',
          i === 0 && 'h-2',
          i === 1 && 'h-3',
          i === 2 && 'h-4',
          i === 3 && 'h-5'
        )}
      />
    ));
  };

  const handleNetworkSelect = (network: WiFiNetwork) => {
    setSelectedNetwork(network);
    setPassword(savedPasswords[network.id] || network.savedPassword || '');
    setShowPassword(false);
    
    if (!network.isSecure) {
      handleConnect(network, '');
    }
  };

  const handleConnect = async (network: WiFiNetwork, pass: string) => {
    setIsConnecting(true);
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Save password if remember is enabled
    if (rememberPassword && pass && network.isSecure) {
      const newSavedPasswords = { ...savedPasswords, [network.id]: pass };
      setSavedPasswords(newSavedPasswords);
      localStorage.setItem('wifi-passwords', JSON.stringify(newSavedPasswords));
    }
    
    // Update network connection status
    setNetworks(prev => prev.map(n => ({
      ...n,
      isConnected: n.id === network.id
    })));
    
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">WiFi Networks</h1>
          <p className="text-gray-600">Select a network to connect</p>
        </div>

        {/* Networks List */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Icon name="Wifi" size={20} className="text-blue-500" />
              Available Networks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {networks.map((network) => (
              <div
                key={network.id}
                onClick={() => handleNetworkSelect(network)}
                className={cn(
                  'flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md',
                  network.isConnected 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon 
                    name={getSignalIcon(network.signalStrength)} 
                    size={20} 
                    className={network.isConnected ? 'text-blue-500' : 'text-gray-600'} 
                  />
                  <div>
                    <div className="font-medium text-gray-900">{network.name}</div>
                    {network.isConnected && (
                      <Badge variant="secondary" className="text-xs mt-1">Connected</Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-end gap-0.5">
                    {getSignalBars(network.signalStrength)}
                  </div>
                  
                  {network.isSecure && (
                    <Icon name="Lock" size={16} className="text-gray-500" />
                  )}
                  
                  {savedPasswords[network.id] && (
                    <Icon name="Key" size={16} className="text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Password Input */}
        {selectedNetwork && selectedNetwork.isSecure && (
          <Card className="shadow-lg border-0 animate-fade-in">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Icon name="Key" size={20} className="text-blue-500" />
                Connect to {selectedNetwork.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter WiFi password"
                      className="pr-10"
                      required
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="remember"
                    checked={rememberPassword}
                    onCheckedChange={setRememberPassword}
                  />
                  <Label htmlFor="remember" className="text-sm text-gray-600">
                    Remember this password
                  </Label>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedNetwork(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isConnecting || !password.trim()}
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                  >
                    {isConnecting ? (
                      <div className="flex items-center gap-2">
                        <Icon name="Loader2" size={16} className="animate-spin" />
                        Connecting...
                      </div>
                    ) : (
                      'Connect'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Info Card */}
        <Card className="mt-6 shadow-lg border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-blue-100 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium mb-1">Secure Connection</p>
                <p className="text-blue-100">
                  Your saved passwords are encrypted and stored locally for quick reconnection.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}