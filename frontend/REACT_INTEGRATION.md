# React Integration Guide for Magic Page Wiz Elements

Este guia explica como integrar os 50 elementos drag-and-drop do Magic Page Wiz em projetos React.

## 📋 Sumário

1. [Estratégias de Integração](#estratégias-de-integração)
2. [Componentes React Básicos](#componentes-react-básicos)
3. [Gestão de Estado](#gestão-de-estado)
4. [Exemplos Práticos](#exemplos-práticos)
5. [Hooks Customizados](#hooks-customizados)
6. [Styling e Temas](#styling-e-temas)

## 🔧 Estratégias de Integração

### 1. Conversão Direta para JSX
Transformar os elementos HTML em componentes React funcionais.

### 2. Wrapper de HTML/CSS/JS
Encapsular o código HTML/CSS/JS existente em componentes React.

### 3. Componentes Híbridos
Usar `dangerouslySetInnerHTML` para casos específicos.

## 🧩 Componentes React Básicos

### Button Component
```jsx
import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false,
  ...props 
}) => {
  return (
    <button 
      className={`mpw-btn mpw-btn--${variant} mpw-btn--${size}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
```

### Counter Component
```jsx
import React, { useState, useEffect } from 'react';

const Counter = ({ 
  startValue = 0, 
  endValue = 100, 
  duration = 2000,
  label = "Counter"
}) => {
  const [count, setCount] = useState(startValue);

  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [endValue, duration]);

  return (
    <div className="mpw-counter">
      <div className="mpw-counter__number">{count}</div>
      <div className="mpw-counter__label">{label}</div>
    </div>
  );
};

export default Counter;
```

### Accordion Component
```jsx
import React, { useState } from 'react';

const AccordionItem = ({ title, children, isOpen, onToggle }) => (
  <div className="mpw-accordion__item">
    <div 
      className="mpw-accordion__header"
      onClick={onToggle}
    >
      {title}
    </div>
    <div className={`mpw-accordion__content ${isOpen ? 'active' : ''}`}>
      {children}
    </div>
  </div>
);

const Accordion = ({ items }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="mpw-accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={openItems.has(index)}
          onToggle={() => toggleItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;
```

### Tabs Component
```jsx
import React, { useState } from 'react';

const Tabs = ({ tabs, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="mpw-tabs">
      <div className="mpw-tabs__headers">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`mpw-tabs__header ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mpw-tabs__content">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;
```

### Timer/Countdown Component
```jsx
import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ 
  initialTime = 600, // 10 minutes in seconds
  onComplete,
  autoStart = false
}) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            setIsRunning(false);
            onComplete && onComplete();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, onComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(initialTime);
    setIsRunning(false);
  };

  return (
    <div className="mpw-timer">
      <div className="mpw-timer__display">
        {formatTime(time)}
      </div>
      <div className="mpw-timer__controls">
        <button onClick={toggleTimer}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
```

### Progress Bar Component
```jsx
import React, { useState, useEffect } from 'react';

const ProgressBar = ({ 
  value = 0, 
  max = 100, 
  animated = false,
  showLabel = true,
  height = '20px'
}) => {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);

  useEffect(() => {
    if (animated) {
      let start = 0;
      const increment = value / 50; // 50 frames for smooth animation
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(start);
        }
      }, 20);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(value);
    }
  }, [value, animated]);

  const percentage = Math.min((displayValue / max) * 100, 100);

  return (
    <div className="mpw-progress-bar">
      {showLabel && (
        <div className="mpw-progress-bar__label">
          {Math.round(percentage)}%
        </div>
      )}
      <div 
        className="mpw-progress-bar__track"
        style={{ height }}
      >
        <div 
          className="mpw-progress-bar__fill"
          style={{ 
            width: `${percentage}%`,
            height: '100%'
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
```

### Modal Component
```jsx
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  closeOnBackdrop = true 
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdrop && e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="mpw-modal" onClick={handleBackdropClick}>
      <div className="mpw-modal__content">
        <div className="mpw-modal__header">
          {title && <h3>{title}</h3>}
          <button 
            className="mpw-modal__close"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="mpw-modal__body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
```

## 🎨 Theme Provider para Cores Customizáveis

```jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({
    primaryColor: '#007cba',
    secondaryColor: '#f0f0f1',
    textColor: '#333333',
    backgroundColor: '#ffffff',
    accentColor: '#ff6b6b',
    successColor: '#4ecdc4',
    warningColor: '#ffe66d',
    dangerColor: '#ff6b6b'
  });

  const updateTheme = (newTheme) => {
    setTheme(prevTheme => ({ ...prevTheme, ...newTheme }));
  };

  const resetTheme = () => {
    setTheme({
      primaryColor: '#007cba',
      secondaryColor: '#f0f0f1',
      textColor: '#333333',
      backgroundColor: '#ffffff',
      accentColor: '#ff6b6b',
      successColor: '#4ecdc4',
      warningColor: '#ffe66d',
      dangerColor: '#ff6b6b'
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      <div style={{ 
        '--primary-color': theme.primaryColor,
        '--secondary-color': theme.secondaryColor,
        '--text-color': theme.textColor,
        '--background-color': theme.backgroundColor,
        '--accent-color': theme.accentColor,
        '--success-color': theme.successColor,
        '--warning-color': theme.warningColor,
        '--danger-color': theme.dangerColor
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
```

## 🎨 Color Customization Panel Component

```jsx
import React from 'react';
import { useTheme } from './ThemeProvider';

const ColorCustomizationPanel = () => {
  const { theme, updateTheme, resetTheme } = useTheme();

  const handleColorChange = (colorKey, value) => {
    updateTheme({ [colorKey]: value });
  };

  const colorControls = [
    { key: 'primaryColor', label: 'Cor Primária' },
    { key: 'secondaryColor', label: 'Cor Secundária' },
    { key: 'textColor', label: 'Cor do Texto' },
    { key: 'backgroundColor', label: 'Cor de Fundo' },
    { key: 'accentColor', label: 'Cor de Destaque' },
    { key: 'successColor', label: 'Cor de Sucesso' }
  ];

  return (
    <div className="mpw-color-panel">
      <h2>🎨 Painel de Personalização de Cores</h2>
      <div className="mpw-color-controls">
        {colorControls.map(({ key, label }) => (
          <div key={key} className="mpw-color-control">
            <label htmlFor={key}>{label}:</label>
            <input
              type="color"
              id={key}
              value={theme[key]}
              onChange={(e) => handleColorChange(key, e.target.value)}
            />
          </div>
        ))}
      </div>
      <button onClick={resetTheme} className="mpw-btn">
        Resetar Cores
      </button>
    </div>
  );
};

export default ColorCustomizationPanel;
```

## 🪝 Hooks Customizados

### useDragAndDrop Hook
```jsx
import { useState, useRef } from 'react';

export const useDragAndDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const dragRef = useRef(null);

  const handleDragStart = (item) => {
    setIsDragging(true);
    setDraggedItem(item);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggedItem(null);
  };

  const handleDrop = (dropZone, onDrop) => {
    if (draggedItem && onDrop) {
      onDrop(draggedItem, dropZone);
    }
    handleDragEnd();
  };

  return {
    isDragging,
    draggedItem,
    dragRef,
    handleDragStart,
    handleDragEnd,
    handleDrop
  };
};
```

### useLocalStorage Hook
```jsx
import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};
```

## 🏗️ Exemplo de Aplicação Completa

```jsx
import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import ColorCustomizationPanel from './components/ColorCustomizationPanel';
import Button from './components/Button';
import Counter from './components/Counter';
import Accordion from './components/Accordion';
import Tabs from './components/Tabs';
import Timer from './components/Timer';
import ProgressBar from './components/ProgressBar';
import Modal from './components/Modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const accordionItems = [
    {
      title: 'Como funciona?',
      content: 'É muito simples de usar e intuitivo.'
    },
    {
      title: 'Qual o preço?',
      content: 'Temos vários planos disponíveis.'
    }
  ];

  const tabsData = [
    {
      label: 'Aba 1',
      content: <div>Conteúdo da primeira aba</div>
    },
    {
      label: 'Aba 2',
      content: <div>Conteúdo da segunda aba</div>
    }
  ];

  const updateProgress = () => {
    setProgress(prev => (prev >= 100 ? 0 : prev + 25));
  };

  return (
    <ThemeProvider>
      <div className="app">
        <header>
          <h1>Magic Page Wiz - React Components</h1>
        </header>

        <ColorCustomizationPanel />

        <div className="components-showcase">
          <div className="component-section">
            <h2>Botões</h2>
            <Button onClick={() => setIsModalOpen(true)}>
              Abrir Modal
            </Button>
            <Button variant="secondary">
              Botão Secundário
            </Button>
          </div>

          <div className="component-section">
            <h2>Contador</h2>
            <Counter 
              endValue={150} 
              label="Projetos Concluídos"
              duration={3000}
            />
          </div>

          <div className="component-section">
            <h2>Barra de Progresso</h2>
            <ProgressBar 
              value={progress} 
              animated={true}
              showLabel={true}
            />
            <Button onClick={updateProgress}>
              Atualizar Progresso
            </Button>
          </div>

          <div className="component-section">
            <h2>Acordeão</h2>
            <Accordion items={accordionItems} />
          </div>

          <div className="component-section">
            <h2>Abas</h2>
            <Tabs tabs={tabsData} />
          </div>

          <div className="component-section">
            <h2>Timer</h2>
            <Timer 
              initialTime={30}
              onComplete={() => alert('Timer finalizado!')}
            />
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Modal de Exemplo"
        >
          <p>Este é um exemplo de modal em React!</p>
          <Button onClick={() => setIsModalOpen(false)}>
            Fechar
          </Button>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

export default App;
```

## 📦 Estrutura de Arquivos Recomendada

```
src/
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.module.css
│   │   │   └── index.js
│   │   ├── Counter/
│   │   ├── Accordion/
│   │   ├── Tabs/
│   │   ├── Timer/
│   │   ├── ProgressBar/
│   │   └── Modal/
│   ├── ColorCustomizationPanel/
│   └── ThemeProvider/
├── hooks/
│   ├── useDragAndDrop.js
│   ├── useLocalStorage.js
│   └── useTheme.js
├── styles/
│   ├── globals.css
│   ├── variables.css
│   └── components.css
└── App.jsx
```

## 🎯 Conclusão

Este guia fornece uma base sólida para integrar os elementos drag-and-drop do Magic Page Wiz em projetos React. Os componentes são:

- **Modulares**: Cada elemento é um componente independente
- **Customizáveis**: Sistema de temas com CSS variables
- **Reutilizáveis**: Props configuráveis para diferentes casos de uso
- **Acessíveis**: Seguem boas práticas de acessibilidade
- **Performantes**: Otimizados com hooks apropriados

Para usar estes componentes:

1. Copie os componentes necessários para seu projeto
2. Instale as dependências CSS
3. Configure o ThemeProvider
4. Importe e use os componentes conforme necessário

Os elementos HTML/CSS/JS originais continuam funcionando de forma independente, oferecendo flexibilidade total na integração.