
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
export default function EditorSettings({ onChange }) {
  const [settings, setSettings] = useState({
    fontSize: "14",
    theme: "light",
    wordWrap: false,
    lineNumbers: true,
  });

  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editor Settings</h1>

      <Card className="mb-4">
        <CardContent className="p-4 space-y-4">
          {/* Font Size */}
          <div className="space-y-2">
            <Label>Default Font Size</Label>
            <Select
              value={settings.fontSize}
              onValueChange={(v) => updateSetting("fontSize", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                {[12, 14, 16, 18, 20, 24].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}px
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Theme */}
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              value={settings.theme}
              onValueChange={(v) => updateSetting("theme", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Word Wrap */}
          <div className="flex items-center justify-between">
            <Label htmlFor="wordWrap">Word Wrap</Label>
            <Switch
              id="wordWrap"
              checked={settings.wordWrap}
              onCheckedChange={(v) => updateSetting("wordWrap", v)}
            />
          </div>

          {/* Line Numbers */}
          <div className="flex items-center justify-between">
            <Label htmlFor="lineNumbers">Line Numbers</Label>
            <Switch
              id="lineNumbers"
              checked={settings.lineNumbers}
              onCheckedChange={(v) => updateSetting("lineNumbers", v)}
            />
          </div>

          <Button className="w-full mt-4">Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
export default function EditorSettings({ onChange }) {
  const [settings, setSettings] = useState({
    fontSize: "14",
    theme: "light",
    wordWrap: false,
    lineNumbers: true,
  });

  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editor Settings</h1>

      <Card className="mb-4">
        <CardContent className="p-4 space-y-4">
          {/* Font Size */}
          <div className="space-y-2">
            <Label>Default Font Size</Label>
            <Select
              value={settings.fontSize}
              onValueChange={(v) => updateSetting("fontSize", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select font size" />
              </SelectTrigger>
              <SelectContent>
                {[12, 14, 16, 18, 20, 24].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}px
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Theme */}
          <div className="space-y-2">
            <Label>Theme</Label>
            <Select
              value={settings.theme}
              onValueChange={(v) => updateSetting("theme", v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Word Wrap */}
          <div className="flex items-center justify-between">
            <Label htmlFor="wordWrap">Word Wrap</Label>
            <Switch
              id="wordWrap"
              checked={settings.wordWrap}
              onCheckedChange={(v) => updateSetting("wordWrap", v)}
            />
          </div>

          {/* Line Numbers */}
          <div className="flex items-center justify-between">
            <Label htmlFor="lineNumbers">Line Numbers</Label>
            <Switch
              id="lineNumbers"
              checked={settings.lineNumbers}
              onCheckedChange={(v) => updateSetting("lineNumbers", v)}
            />
          </div>

          <Button className="w-full mt-4">Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}