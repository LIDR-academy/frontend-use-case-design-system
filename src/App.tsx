import { useState } from 'react';
import { Button, Input, Icon } from './components/atoms';
import { Card, Tag } from './components/molecules';
import { Layout } from './components/layout';

function App() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert('¡Formulario enviado exitosamente!');
    setIsLoading(false);
  };

  return (
    <Layout title="Lidr Design System - Demo Completa">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-text-primary">
            🎨 Lidr Design System
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Una colección completa de componentes React reutilizables con
            TypeScript, diseñados con TailwindCSS y probados con Jest y
            Storybook.
          </p>
        </div>

        {/* Technologies Overview */}
        <Card
          title="🛠️ Tecnologías del Design System"
          className="bg-gradient-to-r from-primary-50 to-secondary-50"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'React 18.3.1', icon: '⚛️' },
              { name: 'TypeScript 5.8.3', icon: '📘' },
              { name: 'TailwindCSS 3.4.3', icon: '🎨' },
              { name: 'Storybook 7', icon: '📚' },
              { name: 'Jest 29.5.0', icon: '🧪' },
              { name: 'Vite 4.3.9', icon: '⚡' },
              { name: 'ESLint', icon: '🔍' },
              { name: 'Chromatic', icon: '🌈' },
            ].map((tech) => (
              <div
                key={tech.name}
                className="text-center p-4 bg-white rounded-lg shadow-sm"
              >
                <div className="text-2xl mb-2">{tech.icon}</div>
                <div className="text-sm font-medium text-text-primary">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Button Component Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary text-center">
            🎯 Componente Button
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="Variantes de Button" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-text-primary">
                    Variantes:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-text-primary">Tamaños:</h4>
                  <div className="flex flex-wrap items-end gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-text-primary">Estados:</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button>Normal</Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Button con Interactividad" className="space-y-4">
              <div className="space-y-4">
                <Button
                  onClick={() => setCount(count + 1)}
                  size="lg"
                  variant="primary"
                >
                  Contador: {count}
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => alert('¡Botón secundario clickeado!')}
                >
                  Alert Button
                </Button>

                <Button variant="outline" onClick={() => setCount(0)}>
                  Reset Counter
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Input Component Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary text-center">
            📝 Componente Input
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="Variantes de Input" className="space-y-4">
              <div className="space-y-4">
                <Input
                  label="Input Outlined"
                  placeholder="Outlined variant"
                  variant="outlined"
                />

                <Input
                  label="Input Filled"
                  placeholder="Filled variant"
                  variant="filled"
                />

                <Input
                  label="Input Standard"
                  placeholder="Standard variant"
                  variant="standard"
                />
              </div>
            </Card>

            <Card title="Input con Estados" className="space-y-4">
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                  label="Campo Requerido"
                  placeholder="Campo obligatorio"
                  required
                />

                <Input
                  label="Campo Deshabilitado"
                  placeholder="Campo no editable"
                  disabled
                />

                <Input
                  label="Campo con Error"
                  placeholder="Campo con error"
                  error="Este campo es requerido"
                />

                <Input
                  label="Campo con Ayuda"
                  placeholder="Campo con ayuda"
                  helperText="Este campo tiene información adicional"
                />
              </div>
            </Card>
          </div>
        </section>

        {/* Input with Icons Showcase */}
        <Card title="🔍 Input con Iconos" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Buscar"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startIcon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              }
            />

            <Input
              label="Contraseña"
              type="password"
              placeholder="Ingresa tu contraseña"
              endIcon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              }
            />
          </div>
        </Card>

        {/* Icon Component Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary text-center">
            🎨 Componente Icon
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="Iconos Disponibles" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Icon name="leaf" size="lg" color="primary" />
                  <div>
                    <div className="font-medium text-text-primary">Leaf</div>
                    <div className="text-sm text-text-secondary">
                      Naturaleza, sostenibilidad
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Icon name="accessibility" size="lg" color="secondary" />
                  <div>
                    <div className="font-medium text-text-primary">
                      Accessibility
                    </div>
                    <div className="text-sm text-text-secondary">
                      Inclusión, diseño universal
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Icon name="x" size="lg" color="destructive" />
                  <div>
                    <div className="font-medium text-text-primary">
                      X (Close)
                    </div>
                    <div className="text-sm text-text-secondary">
                      Cerrar, cancelar, eliminar
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Icon name="handshake" size="lg" color="primary" />
                  <div>
                    <div className="font-medium text-text-primary">
                      Handshake
                    </div>
                    <div className="text-sm text-text-secondary">
                      Colaboración, acuerdo
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <Icon name="arrow-left" size="lg" color="muted" />
                  <div>
                    <div className="font-medium text-text-primary">
                      Arrow Left
                    </div>
                    <div className="text-sm text-text-secondary">
                      Volver, anterior, navegación
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Tamaños y Colores" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">
                    Tamaños:
                  </h4>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <Icon name="leaf" size="xs" />
                      <div className="text-xs text-text-secondary mt-1">xs</div>
                    </div>
                    <div className="text-center">
                      <Icon name="leaf" size="sm" />
                      <div className="text-xs text-text-secondary mt-1">sm</div>
                    </div>
                    <div className="text-center">
                      <Icon name="leaf" size="md" />
                      <div className="text-xs text-text-secondary mt-1">md</div>
                    </div>
                    <div className="text-center">
                      <Icon name="leaf" size="lg" />
                      <div className="text-xs text-text-secondary mt-1">lg</div>
                    </div>
                    <div className="text-center">
                      <Icon name="leaf" size="xl" />
                      <div className="text-xs text-text-secondary mt-1">xl</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">
                    Colores:
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Icon name="accessibility" color="primary" />
                      <span className="text-sm text-text-secondary">
                        Primary
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="accessibility" color="secondary" />
                      <span className="text-sm text-text-secondary">
                        Secondary
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="accessibility" color="muted" />
                      <span className="text-sm text-text-secondary">Muted</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="accessibility" color="destructive" />
                      <span className="text-sm text-text-secondary">
                        Destructive
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="accessibility" color="foreground" />
                      <span className="text-sm text-text-secondary">
                        Foreground
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Tag Component Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary text-center">
            🏷️ Componente Tag
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card title="Tipos y Colores" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">
                    Tipo Positivo:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Tag text="Disponible" color="green" type="positive" />
                    <Tag text="Información" color="blue" type="positive" />
                    <Tag text="Advertencia" color="yellow" type="positive" />
                    <Tag text="Urgente" color="orange" type="positive" />
                    <Tag text="Favorito" color="pink" type="positive" />
                    <Tag text="Premium" color="purple" type="positive" />
                    <Tag text="Neutral" color="gray" type="positive" />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">
                    Tipo Negativo:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Tag text="Disponible" color="green" type="negative" />
                    <Tag text="Información" color="blue" type="negative" />
                    <Tag text="Advertencia" color="yellow" type="negative" />
                    <Tag text="Urgente" color="orange" type="negative" />
                    <Tag text="Favorito" color="pink" type="negative" />
                    <Tag text="Premium" color="purple" type="negative" />
                    <Tag text="Neutral" color="gray" type="negative" />
                  </div>
                </div>
              </div>
            </Card>

            <Card title="Tamaños y Variaciones" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-text-primary mb-3">
                    Tamaños:
                  </h4>
                  <div className="flex items-center gap-3">
                    <Tag text="Pequeño" size="s" color="blue" />
                    <Tag text="Mediano" size="m" color="green" />
                    <Tag text="Grande" size="l" color="purple" />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">
                    Con iconos:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Tag text="Ambos iconos" startIcon endIcon color="blue" />
                    <Tag
                      text="Solo inicio"
                      startIcon
                      endIcon={false}
                      color="green"
                    />
                    <Tag
                      text="Solo final"
                      startIcon={false}
                      endIcon
                      color="orange"
                    />
                    <Tag
                      text="Sin iconos"
                      startIcon={false}
                      endIcon={false}
                      color="purple"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-text-primary mb-3">
                    Interactivos:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <Tag
                      text="Clickeable"
                      color="blue"
                      onClick={() => alert('¡Tag clickeado!')}
                    />
                    <Tag
                      text="Eliminar"
                      color="orange"
                      startIcon={false}
                      onClick={() => alert('¡Eliminar clickeado!')}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card title="🏷️ Casos de Uso Comunes" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-text-primary mb-3">
                  Estados de Producto:
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Tag text="En Stock" color="green" type="positive" />
                  <Tag text="Pocas Unidades" color="yellow" type="positive" />
                  <Tag text="Agotado" color="orange" type="negative" />
                  <Tag text="Descontinuado" color="gray" type="negative" />
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-3">
                  Categorías:
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Tag text="Tecnología" color="blue" startIcon={false} />
                  <Tag text="Viajes" color="green" startIcon={false} />
                  <Tag text="Gastronomía" color="orange" startIcon={false} />
                  <Tag text="Arte" color="purple" startIcon={false} />
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-3">
                  Filtros Activos:
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Tag
                    text="Madrid"
                    color="blue"
                    startIcon={false}
                    onClick={() => alert('Quitar filtro Madrid')}
                  />
                  <Tag
                    text="< 50€"
                    color="green"
                    startIcon={false}
                    onClick={() => alert('Quitar filtro precio')}
                  />
                  <Tag
                    text="5 estrellas"
                    color="yellow"
                    startIcon={false}
                    onClick={() => alert('Quitar filtro estrellas')}
                  />
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-3">
                  Prioridades:
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Tag text="Alta" color="orange" type="negative" size="s" />
                  <Tag text="Media" color="yellow" type="positive" size="s" />
                  <Tag text="Baja" color="gray" type="positive" size="s" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Card Component Showcase */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-text-primary text-center">
            📋 Componente Card
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Card Básica" variant="elevated">
              <p className="text-text-secondary">
                Esta es una card básica con variante elevated. Contiene
                contenido simple y demuestra el uso básico del componente.
              </p>
            </Card>

            <Card
              title="Card con Header Actions"
              variant="outlined"
              headerActions={
                <Button size="sm" variant="outline">
                  Acción
                </Button>
              }
            >
              <p className="text-text-secondary">
                Esta card tiene acciones en el header y usa la variante outlined
                para un estilo diferente.
              </p>
            </Card>

            <Card
              title="Card Interactiva"
              variant="filled"
              onClick={() => alert('¡Card clickeada!')}
              className="cursor-pointer"
            >
              <p className="text-text-secondary">
                Esta card es interactiva y responde a clicks. Usa la variante
                filled para un fondo diferente.
              </p>
            </Card>
          </div>
        </section>

        {/* Form Demo */}
        <Card title="📝 Formulario Completo" className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nombre Completo"
                placeholder="Ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Correo Electrónico"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Input
              label="Mensaje"
              placeholder="Escribe tu mensaje aquí..."
              variant="outlined"
            />

            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setName('');
                  setEmail('');
                }}
              >
                Limpiar
              </Button>

              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar Formulario'}
              </Button>
            </div>
          </form>
        </Card>

        {/* Design System Info */}
        <Card
          title="🎨 Información del Design System"
          className="bg-gradient-to-r from-success-50 to-primary-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-semibold text-text-primary mb-2">
                Storybook
              </h3>
              <p className="text-sm text-text-secondary">
                Documentación interactiva completa con ejemplos en vivo
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-2">🧪</div>
              <h3 className="font-semibold text-text-primary mb-2">Testing</h3>
              <p className="text-sm text-text-secondary">
                Tests unitarios, de integración y visual con Jest y Chromatic
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-2">♿</div>
              <h3 className="font-semibold text-text-primary mb-2">
                Accesibilidad
              </h3>
              <p className="text-sm text-text-secondary">
                WCAG 2.1 AA compliant con navegación por teclado
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white rounded-lg">
            <h4 className="font-semibold text-text-primary mb-2">
              🚀 Próximos Pasos:
            </h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Configurar Chromatic para visual testing</li>
              <li>• Crear más componentes (Modal, Select, Alert)</li>
              <li>• Implementar theme system</li>
              <li>• Agregar internacionalización</li>
            </ul>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export default App;
