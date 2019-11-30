import PropTypes from 'prop-types';
import { h, cloneElement, Component, toChildArray } from 'preact';
import TransitionGroup from './TransitionGroup';

/**
 * The `<ReplaceTransition>` component is a specialized `Transition` component
 * that animates between two children.
 *
 * ```jsx
 * <ReplaceTransition in>
 *   <Fade><div>I appear first</div></Fade>
 *   <Fade><div>I replace the above</div></Fade>
 * </ReplaceTransition>
 * ```
 */
class ReplaceTransition extends Component {
  handleEnter = (...args) => this.handleLifecycle('onEnter', 0, args)
  handleEntering = (...args) => this.handleLifecycle('onEntering', 0, args)
  handleEntered = (...args) => this.handleLifecycle('onEntered', 0, args)

  handleExit = (...args) => this.handleLifecycle('onExit', 1, args)
  handleExiting = (...args) => this.handleLifecycle('onExiting', 1, args)
  handleExited = (...args) => this.handleLifecycle('onExited', 1, args)

  handleLifecycle(handler, idx, originalArgs) {
    const { children } = this.props;
    const child = toChildArray(children)[idx];

    if (child.props[handler]) child.props[handler](...originalArgs)
    if (this.props[handler]) this.props[handler](this.base)
  }

  render() {
    const {
      children,
      in: inProp,
      ...props
    } = this.props;
    const [first, second] = toChildArray(children);

    delete props.onEnter;
    delete props.onEntering;
    delete props.onEntered;
    delete props.onExit;
    delete props.onExiting;
    delete props.onExited;

    return (
      <TransitionGroup {...props}>
        {inProp ?
          cloneElement(first, {
            key: 'first',
            onEnter: this.handleEnter,
            onEntering: this.handleEntering,
            onEntered: this.handleEntered,

          }) :
          cloneElement(second, {
            key: 'second',
            onEnter: this.handleExit,
            onEntering: this.handleExiting,
            onEntered: this.handleExited,
          })
        }
      </TransitionGroup>
    );
  }
}

ReplaceTransition.propTypes = {
  in: PropTypes.bool.isRequired,
  children(props, propName) {
    if (toChildArray(props[propName]).length !== 2)
      return new Error(`"${propName}" must be exactly two transition components.`)

    return null;
  },
};

export default ReplaceTransition;
