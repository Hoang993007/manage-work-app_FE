Appy
- React transition
[https://reactjs.org/docs/code-splitting.html]
[https://reactjs.org/docs/react-api.html#transitions]

- Named export
[https://reactjs.org/docs/code-splitting.html#named-exports]

- useEffect vs useLayoutEffect
[https://viblo.asia/p/useeffect-vs-uselayouteffect-maGK7OBeKj2]
useEffect: Sẽ là lựa chọn đúng, giúp việc tối ưu tốc độ chạy khỏi phải chờ đợi gì thường được dùng để fetching data.
    1. Bạn sẽ gây ra 1 event (thay đổi state/props, re-render từ component cha,...)
    2. Render component.
    3. Màn hình UI được cập nhật.
    4. Chạy useEffect.

useLayoutEffect: Nhưng nếu bạn muốn xử lý đồng bộ với UI thì hãy dùng useLayoutEffect
    1. Bạn sẽ gây ra 1 event (thay đổi state/props, re-render từ component cha,...)
    2. Render component.
    3. Chạy useLayoutEffect, và react sẽ đợi đến khi nào nó hoàn thành.
    4. Màn hình UI được cập nhật.

### React parent-children rerender
React's default behavior is that when a parent component renders, React will recursively render all child components inside of it!.

===> Solution: React.memo()
Ensure that the component inside of it only re-renders if the props have actually changed. 

let PostExcerpt = ({ post }) => {
  // omit logic
}

PostExcerpt = React.memo(PostExcerpt)